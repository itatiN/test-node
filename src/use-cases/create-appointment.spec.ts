import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointmente', () => {
    it('should be able to create an appointment', () => {
        // sut = system under test
        const sut = new CreateAppointment()

        const startsAt = new Date();
        const endsAt = new Date();

        startsAt.setDate(startsAt.getDate() + 1)
        endsAt.setDate(endsAt.getDate() + 2)

        expect(sut.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    });
})