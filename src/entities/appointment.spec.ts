import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date';
import { Appointment } from './appointment'

test('create an appointment', () => {
    const startsAt = getFutureDate('2022-08-09')
    const endsAt = getFutureDate('2022-08-10')

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment)
});


test('cannot create an appointmemt with end date before start date', () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-09')

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })
    }).toThrow()
});


test('cannot create an appointmemt with start date before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3)

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })
    }).toThrow()
})
