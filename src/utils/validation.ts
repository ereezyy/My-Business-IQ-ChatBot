export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateAppointmentForm(form: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!form.customerName?.trim()) {
    errors.push('Name is required');
  }

  if (!form.customerEmail || !validateEmail(form.customerEmail)) {
    errors.push('Valid email is required');
  }

  if (!form.customerPhone || !validatePhone(form.customerPhone)) {
    errors.push('Valid phone number is required');
  }

  if (!form.serviceId) {
    errors.push('Service selection is required');
  }

  if (!form.date) {
    errors.push('Date selection is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}