import puppeteer from 'puppeteer';
// https://github.com/backjello/adonis-jac

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {

  Route.group(() => {
    Route.get('/by-age', 'UsersController.getByAge') // utenti filtrati per età
  }).prefix('users')
  Route.resource('users', 'UsersController').apiOnly()

  Route.get('/posts/create-fake', 'PostsController.createFake')
  Route.resource('/posts', 'PostsController').apiOnly()
  Route.resource('/comments', 'CommentsController').apiOnly()

  Route.get('logout', 'AuthController.logout')

}).middleware('auth')

Route.post('login-with-google', 'AuthController.loginGoogle')
Route.post('login', 'AuthController.login')
Route.post('verify-email', 'AuthController.verifyEmail')
Route.post('send-verification-code', 'AuthController.sendVerificationCode')

// genero pdf
Route.get('pdf-example', async () => {
  const browser = await puppeteer.launch() // avvio un instanza del browser
  const page = await browser.newPage() // apro una nuova pagina web
  await page.emulateMediaType('screen') // emulo il media type
  await page.goto('http://www.google.it', { // vado alla pagina che voglio stampare
    waitUntil: 'networkidle0' // carico css, js, img ecc
  })

  await page.pdf({ //salvo in pdf
    path: 'tmp/esempio.pdf', // nome e percorso del file
    format: 'A4', // formato
    margin: {
      top: '30px',
      bottom: '30px'
    }
  })

  await browser.close() // chiudo l'instanza del browser

})


