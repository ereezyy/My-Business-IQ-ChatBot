import { Service } from '../../types/chat';
import { businessConfig } from '../../config/business';

export function formatServicesResponse(services: Service[]): string {
  const servicesList = services
    .map(service => `
🚀 ${service.name} - ${service.billingType === 'monthly' ? '$' + service.price + '/month' : '$' + service.price}
   ${service.description}
   
   ✨ Key Features:
   ${service.features.map(feature => `   • ${feature}`).join('\n')}
`).join('\n');

  return `Welcome to our transformative AI solutions! Here's what we offer:
${servicesList}

💫 Ready to elevate your business? Which service interests you?`;
}

export function formatPricingResponse(services: Service[]): string {
  const priceList = services
    .map(service => `
💎 ${service.name}
   ${service.billingType === 'monthly' ? '$' + service.price + '/month' : '$' + service.price + ' one-time'}
   ${service.description}`).join('\n');

  return `Investment Options for Your Success:
${priceList}

🚀 Ready to transform your business? Let me know which package interests you!`;
}

export function formatBusinessHoursResponse(): string {
  const hours = Object.entries(businessConfig.hours)
    .map(([day, time]) => `• ${day}: ${time.open === 'Closed' ? '🔒 Closed' : `🕒 ${time.open} - ${time.close}`}`)
    .join('\n');

  return `📅 Our Business Hours:

${hours}

✨ When would you like to connect with us?`;
}

export function formatContactResponse(): string {
  return `📞 Let's Connect!

• Phone: ${businessConfig.phone}
• Email: ${businessConfig.email}
• Location: ${businessConfig.location}

💫 How can we assist you today?`;
}

export function formatLocationResponse(): string {
  return `📍 We're located at:
${businessConfig.location}

🚗 Easy to find and ready to serve you!
Need directions or have any questions about visiting us?`;
}