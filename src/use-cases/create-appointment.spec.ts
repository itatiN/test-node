import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointmente', () => {
    it('should be able to create an appointment', () => {
        const startsAt = getFutureDate('2022-08-09')
        const endsAt = getFutureDate('2022-08-10')

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    });
    
    it('should not be able to create an appointment with overlapping dates', async () => {
        const startsAt = getFutureDate('2022-08-09')
        const endsAt = getFutureDate('2022-08-14')

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:  getFutureDate('2022-08-13'),
            endsAt:  getFutureDate('2022-08-15')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:  getFutureDate('2022-08-08'),
            endsAt:  getFutureDate('2022-08-12')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:  getFutureDate('2022-08-08'),
            endsAt:  getFutureDate('2022-08-15')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt:  getFutureDate('2022-08-10'),
            endsAt:  getFutureDate('2022-08-13')
        })).rejects.toBeInstanceOf(Error)
    });

        
})

