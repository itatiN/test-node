import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt: new Date(),
        endsAt: new Date(),
    })

    expect(appointment).toBeInstanceOf(Appointment)
});

test('cannot create an appointmemt with end date before start date', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    endsAt.setDate(endsAt.getDate() - 1)


    expect(() => {
        const appointment = new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt,
        })
    }).toThrow()
})