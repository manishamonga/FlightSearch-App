describe('FlightCtrl', function () {
    beforeEach(module('app'));
    var ctrl, scope, Flights;



    // Loading module and mock the data
    beforeEach(function () {
        var mockFlightService = {};

        // Initialize the `Trip` factory service with empty mock
        module('app', function ($provide) {
            $provide.value('Flights', mockFlightService);
        });

        // Inject the mock-data into the service
        inject(function ($q) {
            mockFlightService.data = {
                "data": {
                    "East Genemouth": [
                        {
                            "flightName": "GZP",
                            "from": "East Genemouth",
                            "to": "Lake Valentin",
                            "date": "2018-07-13T18:30:00.000Z",
                            "dtime": "04:30 pm",
                            "rtime": "6:30 pm",
                            "price": 2532
                        },
                        {
                            "flightName": "1FO",
                            "from": "East Genemouth",
                            "to": "South Ambrosestad",
                            "date": "2018-07-11T18:30:00.000Z",
                            "dtime": "04:30 pm",
                            "rtime": "6:30 pm",
                            "price": 2229
                        },
                        {
                            "flightName": "425",
                            "from": "East Genemouth",
                            "to": "Lake Lorena",
                            "date": "2018-07-12T18:30:00.000Z",
                            "dtime": "04:30 pm",
                            "rtime": "6:30 pm",
                            "price": 4404
                        }
                    ],
                }
            }

            // Create mock function `getAllOnewayTrips` to get promise with mock-data when it will be invoked
            mockTripsService.getFlightData = function () {
                var defer = $q.defer();
                console.log("data", this.data);
                defer.resolve(this.data);

                return defer.promise;
            };
            // Create mock function `getAllReturnTrips` to get promise with mock-data when it will be invoked
            // mockTripsService.getAllReturnTrips = function () {
            //     var defer = $q.defer();

            //     defer.resolve(this.data);

            //     return defer.promise;
            // };
        });

    });



    beforeEach(inject(function ($controller, $rootScope, _Flights_) {
        scope = $rootScope.$new();
        Flights = _Flights_;
        ctrl = $controller('FlightCtrl', {
            $scope: scope,
            Flights: Flights
        });

    }));


    it('FlightCtrl to be defined', function () {
        expect(ctrl).toBeDefined();
    });

    it('generate flight', function () {
        ctrl.generateFlights();
        console.log(ctrl.flights[0])
        expect(ctrl.flights.length).toBeGreaterThan(0);

        //we lnow aht fligjt nunber 101 goes to mum from del daily at 7:30 AM and takes 90 minutes

        expect(ctrl.flights[0].flightName).toEqual("BLK");

    });

    //now all depends upon manisha's creativity




});




