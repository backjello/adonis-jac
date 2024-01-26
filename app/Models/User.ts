import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, afterFind, beforeSave, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ // cambio il nome di questa proprietà quando la serializzo
    serializeAs: 'nome'
  })
  public name: string

  @column({ // metto in maiscolo quando serializzo
    serialize: (value: string) => value.toUpperCase()
  })
  public surname: string

  @column()
  public email: string

  @column({ // non viene serializzata
    serializeAs: null
  })
  public password: string

  @column()
  public age: number

  @column() // se l'utente è bloccato o no
  public blocked: boolean

  // fullname non ha il decoratore column perchè non è un campo nella tabella user
  @computed() // serializzo la proprietà fullname
  public fullname: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  // ogni volta che faccio update o insert
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) { // solo se la password è stata modificata
      user.password = await Hash.make(user.password)
    }
  }

  @afterFind()
  public static async makeFullName(user: User) {
    user.fullname = user.name + " " + user.surname
  }

}
