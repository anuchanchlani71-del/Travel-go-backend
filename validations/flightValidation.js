// const {celebrate, Joi} = require('celebrate')

// // module.exports.Addflights = celebrate({
// //     body: Joi.object().keys({
// //         flightnumber: Joi.string().required(),
// //         airline:      Joi.string().required(),
// //         from:         Joi.string().required(),
// //         to:           Joi.string().required(),
// //         departuretime:Joi.string().required(),
// //         arrivaltime:  Joi.string().required(),
// //         price:        Joi.number().required(),
// //         middlestop:   Joi.string().optional(),
// //         seats:        Joi.number().optional()
// //     })
// // })

// module.exports.Addflights = celebrate({
//     body: Joi.object().keys({
//         flightnumber: Joi.string().required(),
//         airline: Joi.string().required(),
//         airlineCode: Joi.string().required(),

//         from: Joi.object({
//             city: Joi.string().required(),
//             airport: Joi.string().required(),
//             code: Joi.string().required()
//         }).required(),

//         to: Joi.object({
//             city: Joi.string().required(),
//             airport: Joi.string().required(),
//             code: Joi.string().required()
//         }).required(),

//         departuretime: Joi.date().required(),
//         arrivaltime: Joi.date().required(),
//         duration: Joi.number().required(),

//         stops: Joi.array().items(
//             Joi.object({
//                 city: Joi.string().required(),
//                 airport: Joi.string().required(),
//                 code: Joi.string().required(),
//                 arrivalTime: Joi.date().required(),
//                 departureTime: Joi.date().required()
//             })
//         ).optional(),

//         classes: Joi.object({
//             economy: Joi.object({
//                 price: Joi.number().required(),
//                 seats: Joi.number().required(),
//                 availableSeats: Joi.number().required()
//             }).required(),

//             business: Joi.object({
//                 price: Joi.number().required(),
//                 seats: Joi.number().required(),
//                 availableSeats: Joi.number().required()
//             }).required()
//         }).required(),

//         aircraft: Joi.object({
//             name: Joi.string().required(),
//             code: Joi.string().required()
//         }).required(),

//         baggage: Joi.object({
//             checkIn: Joi.string().required(),
//             cabin: Joi.string().required()
//         }).required(),

//         fareRules: Joi.object({
//             refundable: Joi.boolean().required(),
//             cancellationFee: Joi.number().required(),
//             rescheduleFee: Joi.number().required()
//         }).required(),

//         amenities: Joi.array().items(Joi.string()).optional(),

//         createdBy: Joi.string().required()
//     })
// })


// module.exports.flightbooking = celebrate({
//     body: Joi.object().keys({
//         passangerName:      Joi.string().required(),
//         passangerEmail:     Joi.string().email().required(),
//         totalseatsBooked:   Joi.number().required()
//     })
// })

const { celebrate, Joi } = require('celebrate')

module.exports.Addflights = celebrate({
    body: Joi.object().keys({
        flightnumber: Joi.string().required(),
        airline: Joi.string().required(),
        airlineCode: Joi.string().required(),
         status: Joi.string().optional(),

        from: Joi.object({
            city: Joi.string().required(),
            airport: Joi.string().required(),
            code: Joi.string().required()
        }).required(),

        to: Joi.object({
            city: Joi.string().required(),
            airport: Joi.string().required(),
            code: Joi.string().required()
        }).required(),

        departuretime: Joi.date().required(),
        arrivaltime: Joi.date().required(),
        duration: Joi.number().required(),

        stops: Joi.array().items(
            Joi.object({
                city: Joi.string().required(),
                airport: Joi.string().required(),
                code: Joi.string().required(),
                arrivalTime: Joi.date().required(),
                departureTime: Joi.date().required()
            })
        ).optional(),

        classes: Joi.object({
            economy: Joi.object({
                price: Joi.number().required(),
                seats: Joi.number().required(),
                availableSeats: Joi.number().required(),

                // ✅ NEW (schema ke hisaab se)
                amenities: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required(),
                        included: Joi.boolean().required(),
                        price: Joi.number().required()
                    })
                ).optional()
            }).required(),

            business: Joi.object({
                price: Joi.number().required(),
                seats: Joi.number().required(),
                availableSeats: Joi.number().required(),

                // ✅ NEW
                amenities: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required(),
                        included: Joi.boolean().required(),
                        price: Joi.number().required()
                    })
                ).optional()
            }).required()
        }).required(),

        aircraft: Joi.object({
            name: Joi.string().required(),
            code: Joi.string().required()
        }).required(),

        baggage: Joi.object({
            checkIn: Joi.string().required(),
            cabin: Joi.string().required()
        }).required(),

        fareRules: Joi.object({
            refundable: Joi.boolean().optional(),
            cancellationFee: Joi.number().optional(),
            rescheduleFee: Joi.number().optional()
        }).required(),

        // ❌ REMOVE (global amenities nahi hai ab)
        // amenities: Joi.array().items(Joi.string()),

        createdBy: Joi.string().optional(),
    })
})