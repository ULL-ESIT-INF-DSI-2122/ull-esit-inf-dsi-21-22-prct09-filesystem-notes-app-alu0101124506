# Práctica 8 - Aplicación de procesamiento de notas de texto

## Objetivos

* Familiarizarnos con el API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros.
* Familiarizarnos con Chalk y Yargs

## Desarrollo

He dividido la aplicacion en tres partes, la clase Note, en donde tendremos la informacion de las notas individuales, la clase Notepad, en donde tendremos la informacion del conjunto de notas de cada usuario, y la clase main, la cual sera donde estara la apliacion principal, donde se regulan los distintos comandos posibles.


### Clase Note


En esta clase lo principal es la funcion 'print()', la cual mostrara el titula y el cuerpo de la nota en su color correspondiente.
La otra funcion importante es la 'getNote()' la cual nos da la nota en la manera que tiene que aparecer en el .json.


````
const chalk = require('chalk')

const error = chalk.red;
const good = chalk.green;


/**
 * Clase Note, la cual describe lo que contiene una nota
 */
export class Note {

  constructor(private title: string, private text: string,
    private color: string) {}

  
  /**
   * Clase que imprime una nota dependiendo del color de la misma
   */
  print(): void {
    switch (this.color) {
      case 'red':
        console.log(chalk.red(this.title));
        console.log(chalk.red(this.text));
        break;
      case 'green':
        console.log(chalk.green(this.title));
        console.log(chalk.green(this.text));
        break;
      case 'blue':
        console.log(chalk.blue(this.title));
        console.log(chalk.blue(this.text));
        break;
      case 'yellow':
        console.log(chalk.yellow(this.title));
        console.log(chalk.yellow(this.text));
        break;
      default:
        console.log(error('No se pudo imprimir la nota'));
    }
  }


  /**
   * Funcion para conseguir una nota
   * @returns devuelve la nota deseada
   */
  getNote(): string {
    return `"title": "${this.title}",\n"text": "${this.text}",\n"color": "${this.color}"`;
  }


  /**
   * Funcion para modificar el contenido de la nota
   * @param newNote nuevo contenido de la nota
   */
  modify(newNote: string): void {
    this.text = newNote;
  }


  /**
   * Funcion para conseguir el titulo de la nota
   * @returns retorna el titulo de la nota deseada
   */
  getTitle() : string {
      return this.title;
  }


  /**
   * Funcion para saber el color de la nota
   * @returns retorna el color de la nota deseada
   */
  getColor() : string {
      return this.color;
  }
}
````


### Clase NotePad


Aqui tenemos las funciones que despues llamaremos desde el main para realizar los comandos.
Tenemos 'addNote()' la cual agrega una nota nueva, creando si es necesario la carpeta para el usuario junto con la nota .json llamando a la funcion que mencionamos en la clase anterior.
'modifyNote()' sobre escribe el cuerpo de la nota con el titulo que nos hayan dicho.
'removeNote()' elimina por completo la note que se nos indica
'listtitle()' nos muestra todos los titulos de las notas de un usuario
'readNote()' lee una nota especifica de un usuario


````
import {Note} from './note';
import {readFile, writeFile, existsSync, readdirSync} from 'fs';
import {spawn} from 'child_process';

const chalk = require('chalk');

const error = chalk.red;
const good = chalk.green;


/**
 * Clase la cual contiene todas las notas creadas
 */
export class NotePad {
  constructor(private username: string) {
  }


  /**
   * Funcion que busca una nota por su titulo
   * @param title le pasamos el titulo de la nota que queremos encontrar
   * @returns retorna true si se encontro la nota o false en el caso contrario
   */
  findNote(title: string): boolean {
    if (existsSync(`./${this.username}/${title}.json`)) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Funcion que añade una nota
   * @param newNote le pasamos la nota que queremos añadir
   */
  addNote(newNote: Note) {
    if (this.findNote(newNote.getTitle())) {
      console.log(error('Existe una nota con el mismo titulo'));
    } else {
      writeFile(`./${this.username}/${newNote.getTitle()}.json`,
          `{\n${newNote.getNote()}\n}`, (err) => {
            if (err) {
              console.log(error('No se pudo crear la nota'));
            } else {
              console.log(good('Se ha añadido la nota'));
            }
          });
    }
  }


  /**
   * Funcion que modifica la nota deseada
   * @param title le pasamos el titulo de la nota para buscarla
   * @param newText este sera el nuevo contenido de la nota
   * @param color el color de la nota
   */
  modifyNote(title: string, newText: string, color: string) {
    if (this.findNote(title)) {
      writeFile(`./${this.username}/${title}.json`,
          `{\ntitle: ${title}\ntext: ${newText}\ncolor: ` +
          `${color}\n}`, (err) => {
            if (err) {
              console.log(error('No se pudo modificar la nota.'));
            } else {
              console.log(good('Se ha modificado la nota'));
            }
          });
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que elimina una nota
   * @param title le pasamos el titulo de la nota que deseamos eliminar
   */
  removeNote(title: string) {
    if (this.findNote(title)) {
      spawn('rm', [`./${this.username}/${title}.json`]);
      console.log(good('Se ha eliminado la nota'));
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que nos muestra por pantalla una lista con todos los titulos de las notas
   */
  listTitle(): void {
    if (existsSync(`./${this.username}`)) {
      const files = readdirSync(`./${this.username}`);
      files.forEach((file) => {
        readFile(`./${this.username}/${file}`, (err, data) => {
          if (err) {
            console.log(error('No se pudo leer el fichero'));
          } else {
            const d = JSON.parse(data.toString());
            switch (d.color) {
              case 'red':
                console.log(chalk.red(d.title));
                break;
              case 'green':
                console.log(chalk.green(d.title));
                break;
              case 'blue':
                console.log(chalk.blue(d.title));
                break;
              case 'yellow':
                console.log(chalk.yellow(d.title));
                break;
              default:
                console.log(d.title);
            }
          }
        });
      });
    }
  }


  /**
   * Funcion para poder leer el contenido de una nota
   * @param title titulo de la nota la cual queremos leer el contenido
   */
  readNote(title: string) {
    if (this.findNote(title)) {
      readFile(`./${this.username}/${title}.json`, (err, data) => {
        if (err) {
          console.log(error('No se pudo leer el fichero'));
        } else {
          const d = JSON.parse(data.toString());
          switch (d.color) {
            case 'red':
              console.log(chalk.red(`\n${d.title}\n${d.text}\n`));
              break;
            case 'green':
              console.log(chalk.green(`\n${d.title}\n${d.text}\n`));
              break;
            case 'blue':
              console.log(chalk.blue(`\n${d.title}\n${d.text}\n`));
              break;
            case 'yellow':
              console.log(chalk.yellow(`\n${d.title}\n${d.text}\n`));
              break;
            default:
              console.log(`\n${d.title}\n${d.text}\n`);
          }
        }
      });
    } else {
      console.log(error('No existe una nota con el mismo titulo'));
    }
  }


  /**
   * Funcion que nos devuelve el usuario de la nota
   * @returns retorna el nombre de usuario
   */
  getUsername(): string {
    return this.username;
  }
}
````


### Clase Main (aplicacion principal)


Aqui es donde usams 'yargs' para hacer los comandos que nos daran al ejecutar la aplicacion.
Tenemos:
* Add: agrega una nota al usuario
* List: muestra una lista de todos los titulos de las notas de un usuario
* Read: lee una nota determinada
* Remove: elimina una nota determinada


````
import * as yargs from 'yargs';
import {Note} from './note';
import {NotePad} from './notepad';

const spawn = require('child_process').spawn;


/**
 * Usamos yargs para detallar los comandos que se podran usar por terminal
 * 
 * Primero tenemos el de añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Text of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.body === 'string' &&
    typeof argv.color == 'string' && typeof argv.user === 'string') {
      const newNote = new Note(argv.title, argv.body, argv.color);
      const ls = spawn('ls');
      let lsOutput = '';
      ls.stdout.on('data', (piece) => lsOutput += piece);
      const lsSplit = lsOutput.split(/\s+/);
      const i = lsSplit.findIndex((element) => element ==
      argv.user);
      const aux = new NotePad(argv.user);
      if (i == -1) {
        spawn('mkdir', [`${argv.user}`]);
      }
      aux.addNote(newNote);
    }
  },
});


/**
 * Comando con yards para listar todas las notas que hay creadas
 */
yargs.command({
  command: 'list',
  describe: 'List the titles of the notes of a particular user',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.listTitle();
    }
  },
});


/**
 * Comando con yards para leer una nota especifica
 */
yargs.command({
  command: 'read',
  describe: 'Read a particular note of the user specified',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.readNote(argv.title);
    }
  },
});


/**
 * Comando con yards para eliminar una nota especifica
 */
yargs.command({
  command: 'remove',
  describe: 'Removes a note of the user',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      const aux = new NotePad(argv.user);
      aux.removeNote(argv.title);
    }
  },
});

yargs.parse();
````


### Ejemplos

Usando el comando 'add' para agregar una nota al user1 y al user2

![add](/img/1.png)

Resultado

![result-add](/img/2.png)

Ahora usamos el comando 'read' para leer la nota del user1

![read-user1](/img/3.png)

Leemos la nota del user2 con el mismo comando

![read-user2](/img/4.png)

Agregamos una segunda nota el user1 con el comando 'add'

![add2](/img/5.png)

Resultado

![result-add2](/img/6.png)

Por ultimo usamos el comando 'list' en el user1

![list-user1](/img/7.png)

Ahora eliminamos la nota roja del user1, usando el comando 'remove'

![remove-note](/img/8.png)

Resultado

![result-remove](/img/9.png)