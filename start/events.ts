import Event from '@ioc:Adonis/Core/Event';

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

// nome dell'evento "db:query"
Event.on("db:query", ({ sql, bindings }) => {
  console.log(sql, bindings);
})


// ESEMPIO DI EVENTO CUSTOM

//Event.emit('eventocustom', { ciao: 'hello' })


//Event.on('eventocustom', (data) => {
//console.log(data);
//})
