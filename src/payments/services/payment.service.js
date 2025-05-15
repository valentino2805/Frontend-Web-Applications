import Payment from '../model/payment.entity.js'

export async function getPaymentsForDesigner() {
  return [
    new Payment({
      id: 1,
      projectName: 'Logo Redesign',
      amount: 120,
      date: '2025-04-12',
      clientName: 'María López',
      clientImage: 'https://randomuser.me/api/portraits/women/65.jpg'
    }),
    new Payment({
      id: 2,
      projectName: 'Brand Identity',
      amount: 250,
      date: '2025-05-01',
      clientName: 'Carlos Gómez',
      clientImage: 'https://randomuser.me/api/portraits/men/22.jpg'
    })
  ]
}

export async function getPaymentsForClient() {
  return [
    new Payment({
      id: 3,
      projectName: 'Landing Page',
      amount: 150,
      date: '2025-04-15',
      clientName: 'Pedro Pérez',
      clientImage: 'https://randomuser.me/api/portraits/men/45.jpg' // fake designer
    })
  ]
}
