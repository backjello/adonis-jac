import { faker } from '@faker-js/faker';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import puppeteer from 'puppeteer';

export default class OrdersController {

  async pdf({ view }: HttpContextContract) {
    const items: any[] = []
    for (let i = 0; i < 100; i++) {
      items.push({
        name: faker.commerce.product(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.number.float({ min: 1, max: 100, precision: 2 }),
        vat: faker.number.int({ min: 1, max: 2 }) == 1 ? 22 : 0
      })
    }
    const name = 'mario'
    return view.render('order', {
      items: items,
      name: name
    })
  }

  async pdfMake({ view }: HttpContextContract) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.emulateMediaType('screen')
    await page.goto('http://localhost:3333/order-pdf', {
      waitUntil: 'networkidle0'
    })

    await page.pdf({
      path: 'tmp/order.pdf',
      format: 'A4',
      margin: {
        left: '20px',
        right: '20px',
        top: '100px',
        bottom: '100px'
      },
      headerTemplate: await view.render('order_header'), // template dell'header
      footerTemplate: await view.render('order_footer'), // template del footer
      displayHeaderFooter: true // specifico che voglio visuallizare il footer e l'header
    })

    await browser.close()

  }
}
