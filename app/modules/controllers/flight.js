angular.module('app', [])

    .controller('FlightCtrl', function (Flights) {
        var _this = this;
        _this.flightsAvailable = false;
        _this.returnBtn = false;



        var cities = [];
        var flights = [];

        // var numberOfCitiesWeOperate = 4;
        // var numberOfFlights = 1000;


        // function getRandomInt(min, max) {
        //     var v = Math.floor(Math.random() * (max - min + 1)) + min;
        //     return v;
        // }

        // function getSourceDestPair() {
        //     var n1 = getRandomInt(0, numberOfCitiesWeOperate - 1);
        //     var n2 = getRandomInt(0, numberOfCitiesWeOperate - 1);
        //     while (n1 == n2) {
        //         n2 = getRandomInt(0, numberOfCitiesWeOperate - 1);
        //     }
        //     var src = cities[n1];
        //     var dest = cities[n2];
        //     return [src, dest];
        // }



        // function nextWeekDate() {
        //     var today = new Date();
        //     var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + getRandomInt(0, 3));
        //     return date;
        // }


        // function generateFlights() {
        //     for (var i = 0; i < numberOfCitiesWeOperate; i++) {
        //         cities.push(faker.address.city());
        //     }
        //     //console.log(cities);
        //     //we need flghts
        //     for (var i = 0; i < numberOfFlights; i++) {
        //         var srcDest = getSourceDestPair();
        //         var ddate = faker.date.future();
        //         var code = (faker.random.alphaNumeric() + faker.random.alphaNumeric() + faker.random.alphaNumeric()).toUpperCase();
        //         var date = nextWeekDate();
        //         flights.push({
        //             flightName: code,
        //             from: srcDest[0],
        //             to: srcDest[1],
        //             date: date,
        //             dtime: '04:30 pm',
        //             rtime: '6:30 pm',
        //             durationInMinutes: 180,
        //             equipment: 'B737',
        //             price: getRandomInt(999, 4999)
        //         })
        //     }
        //     console.log(flights);

        //     _this.cities = cities;
        //     _this.flights = flights;

        //     //console.log(_this.flights);
        // }

        _this.findFlights = function (model) {


            if (!model.from) {

                alert("Please Enter Source City");
                console.log('Source');
                return;
            }
            if (!model.to) {
                alert("Please enter Destination City");
                console.log('Dest');
                return;
            }
            if (model.mode < 1) {
                if (!model.ddate) {
                    alert()
                    console.log('Depart ?');
                    return;
                }
                model.rdate = "";
            }
            if (model.mode == 1) {

                if (!model.rdate) {
                    console.log('Return ?');
                    return;
                }

                else {
                    if (model.rdate < model.ddate) {
                        alert("Departure Date cannot be greater than Return Date");
                        return;
                    }

                }

                _this.userInputReturnDate = `${new Date(model.rdate).getFullYear()}-${new Date(model.rdate).getMonth() + 1}-${new Date(model.rdate).getDate()}`;
            }



            if (!_this.userInputDepartureDate) {
                _this.userInputDepartureDate = `${new Date(model.ddate).getFullYear()}-${new Date(model.ddate).getMonth() + 1}-${new Date(model.ddate).getDate()}`;

            }





            _this.mode = model.mode;
            _this.flightsAvailable = true;
            _this.oneWayFlights = [];
            // console.log(model);



            _this.flightsD = _.filter(_this.flights, function (flight) {

                return (new Date(flight.date).getDate() + 1) == new Date(model.ddate).getDate() &&
                    new Date(flight.date).getMonth() == new Date(model.ddate).getMonth() &&
                    new Date(flight.date).getFullYear() == new Date(model.ddate).getFullYear() &&
                    flight.from.toUpperCase() == model.from.toUpperCase() && flight.to.toUpperCase() == model.to.toUpperCase() &&
                    flight.price >= model.minPrice && flight.price <= model.maxPrice
            });


            if (model.mode == 1) {
                if (model.ddate < model.rdate) {
                    _this.flightsR = _.filter(_this.flights, function (flight) {
                        return (new Date(flight.date).getDate() + 1) == new Date(model.ddate).getDate() &&
                            new Date(flight.date).getMonth() == new Date(model.ddate).getMonth() &&
                            new Date(flight.date).getFullYear() == new Date(model.ddate).getFullYear() &&
                            flight.from == model.to && flight.to == model.from &&
                            flight.price >= model.minPrice && flight.price <= model.maxPrice
                    });
                }

                else {
                    alert("return date should be greater or equal than departure date");
                }

            }


            if (!_this.flightsD && !_this.flightsR) {
                console.log("no flights avaialable");
                //alert("No flights available");
            }

            return {
                departing: _this.flightsD,
                returning: _this.flightsR
            }
        }
        _this.$onInit = function () {
            var _this = this;

            Flights.getFlightData().then(function (response) {
                console.log(response);
                _this.flights = response.flights;
                _this.cities = response.cities;
            })

            // generateFlights();

            _this.inputModel = {
                minPrice: 999,
                maxPrice: 4999
            }
            _this.results = [];


            var lowerSlider = document.querySelector('#lower'),
                upperSlider = document.querySelector('#upper');


            lowerVal = parseInt(lowerSlider.value);
            upperVal = parseInt(upperSlider.value);

            upperSlider.oninput = function () {
                lowerVal = parseInt(lowerSlider.value);
                upperVal = parseInt(upperSlider.value);
                if (upperVal < lowerVal + 4) {
                    lowerSlider.value = upperVal - 4;
                    if (lowerVal == lowerSlider.min) {
                        upperSlider.value = 4;
                    }
                    $timeout(function () {
                        $ctrl.inputModel.minPrice = lowerVal;
                        $ctrl.inputModel.minPrice = upperVal;
                        $ctrl.findFlights($ctrl.inputModel);
                    }, 0);
                }
            };


            lowerSlider.oninput = function () {
                lowerVal = parseInt(lowerSlider.value);
                upperVal = parseInt(upperSlider.value);
                if (lowerVal > upperVal - 4) {
                    upperSlider.value = lowerVal + 4;
                    if (upperVal == upperSlider.max) {
                        lowerSlider.value = parseInt(upperSlider.max) - 4;
                    }

                    $timeout(function () {
                        $ctrl.inputModel.minPrice = lowerVal;
                        $ctrl.inputModel.minPrice = upperVal;
                        $ctrl.findFlights($ctrl.inputModel);
                    }, 0);
                }
            };

        };


        //on:departure
        //ToDO: dateformat
        _this.onDepartChange = function (ddate) {
            // console.log(ddate.getDate() + '-' + ddate.getMonth() + '-' + ddate.getFullYear());
        }
        //on:return
        _this.onReturnChange = function (ddate) {
            //console.log(ddate.getDate() + '-' + ddate.getMonth() + '-' + ddate.getFullYear());
        }





    })
    .factory('Flights', ['$http', '$q', function ($http, $q) {
        function getFlightData() {
            var respond = $q.defer();

            $http.get("../flight-data.json").then(function (res) {
                respond.resolve(res.data);

            }), function (error) {
                console.log("error", error);
                respond.reject(error);
            }

            return respond.promise;

        };
        return {
            getFlightData: getFlightData
        }

    }
    ]);