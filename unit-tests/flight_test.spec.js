describe('FlightCtrl', function () {
    beforeEach(module('app'));

    var ctrl, $rootScop;
    var inputModel = {
        from: '',
        to: '',
        ddate: '',
        rdate: '',
        minPrice: '',
        maxPrice: "",
        model: ""
    };


    var flights = [
        {
            "from": "stepanakert",
            "to": "yerevan",
            "date": "2018-07-12",
            "dtime": "4:30 pm",
            "rtime": "5:30 pm",
            "price": "100"

        },
        {
            "from": "stepanakert",
            "to": "yerevan",
            "date": "2018-07-13",
            "dtime": "4:30 pm",
            "rtime": "5:30 pm",
            "price": "500"
        },
        {
            "from": "yerevan",
            "to": "stepanakert",
            "date": "2018-07-14",
            "dtime": "4:30 pm",
            "rtime": "5:30 pm",
            "price": "800"
        }
    ]






    beforeEach(inject(function ($controller, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        ctrl = $controller('FlightCtrl');
        $rootScope = _$rootScope_;


    }));


    describe('Action Handlers', function () {

        // Unit testing `getTrips` function
        describe('function getFlights', function () {

            it('Should get all available one way flights', function () {
                // Before action function call the flights should be an empty object
                ctrl.flightsD = [];

                expect(!ctrl.flightsD).toEqual(0);
                inputModel.to = 'yerevan';
                inputModel.from = 'stepanakert';

                ctrl.findFlights(inputModel);

                // When the function is called and mocked data is returned then expect the length of `flight` array
                // to be equal to the length of the mocked data
                console.log("ded", flights.length)
                expect(ctrl.flightsD.length).toEqual(flights);

            });

            it('Should get all available return flights', function () {
                // Before action function call the flights should be an empty object
                ctrl.flightsR = [];
                expect(ctrl.flightsD.length).toEqual(0);
                inputModel.to = 'yerevan';
                from = 'stepanakert';

                ctrl.findFlights(Flights.data);

                // When the function is called and mocked data is returned then expect the length of `flight` array
                // to be equal to the length of the mocked data
                expect(ctrl.flightsD.length).toEqual(3);
            });


            it('Should filter the flights result by the selected range of price', function () {
                ctrl.flights = [];

                inputModel.minPrice = 100;
                inputModel.maxPrice = 600;


                // After this function call the values of flights should be with price attribute at the range of 100 and 500
                ctrl.filterByPrice();


                expect(ctrl.flights.length).toEqual(2);
            });

        });

        // Unit testing `filterByPrice` function
        // describe('function filterByPrice', function () {



        // })
    });

    // describe('findFlights', function () {
    //     it('sets "corrected source" if the entered city is matches ', function () {
    //         ctrl.from = 'delhi';
    //         ctrl.findFlights(model.from);
    //         expect(ctrl.from).toEqual(model.from);
    //     });

    // });
});




