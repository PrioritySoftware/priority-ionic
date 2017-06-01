# Proirity Ionic

Priority Ionic is the Priority development library for building mobile apps.

Priority Ionic is built on top of [Angular](https://angular.io/), [Ionic](https://ionicframework.com/) and the [Priority Web SDK](https://prioritysoftware.github.io/api), all put together to create the best development library for Priority in mobile.

Priority Ionic provides a set of powerfull services along with usefull components that make building Ionic apps integrating with Priority easier than ever.

Explore the [docs](https://prioritysoftware.github.io/priority-ionic) for further explenation on how to use Priority Ionic, its API and content.

### Getting Started

Install Priority Ionic package via npm:

```bash
$ npm install priority-ionic --save
```
<br/>
Then add the `PriorityIonicModule` to your app's module imports:

```js
import { PriorityIonicModule } from 'priority-ionic';

@NgModule({
  ...
  imports: [
    PriorityIonicModule,
    IonicModule.forRoot(AppComponent)
  ],
  ...
})
export class AppModule {}
```

Thats it! you are now ready to go.

### Demo app

The Confectionery app is a demo app built with the Priority Ionic library. It is the perfect starting point for learning and building your own app.

### Contributing

You're more than wellcome contributing by [opening an issue](/issues/new) or submitting a pull request with your fixes or additions.

Setup:

 1. Fork and clone the repo.
 2. Install dependencies. run `$ npm install`
 3. Compile sources. run `$ npm run build`.
 4. Install locally in your project with `$ npm install file:path/to/repo`




