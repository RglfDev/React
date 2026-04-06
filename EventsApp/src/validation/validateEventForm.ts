export function validateEventForm(title: string, location: string, date: string, capacity: number): string[] {
    const errors: string[] = [];

    if (!title.trim()) {
        errors.push("Title is required");
    } else if (title.trim().length < 3) {
        errors.push("Title must be at least 3 characters");
    } else if (title.trim().length > 100) {
        errors.push("Title cannot exceed 100 characters");
    }

    if (!location.trim()) {
        errors.push("Location is required");
    } else if (location.trim().length < 3) {
        errors.push("Location must be at least 3 characters");
    } else if (location.trim().length > 100) {
        errors.push("Location cannot exceed 100 characters");
    }

    if (!date) {
        errors.push("Date is required");
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.push("Event date cannot be in the past");
        }

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 5);

        if (selectedDate > maxDate) {
            errors.push("Event date cannot be more than 5 years in the future");
        }
    }

    if (!capacity || capacity <= 0) {
        errors.push("Capacity must be greater than 0");
    } else if (capacity < 1) {
        errors.push("Minimum capacity is 1 person");
    } else if (capacity > 10000) {
        errors.push("Maximum capacity is 10,000 people");
    } else if (!Number.isInteger(capacity)) {
        errors.push("Capacity must be a whole number");
    }

    return errors;
}
