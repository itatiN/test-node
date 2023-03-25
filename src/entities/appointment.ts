interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: AppointmentProps;

    get custumer(): string {
        return this.props.customer;
    }

    get startsAt(): Date {
        return this.props.startsAt;
    }

    get endsAt(): Date {
        return this.props.endsAt;
    }

    constructor(props: AppointmentProps) {
        this.props = props;
    }

}