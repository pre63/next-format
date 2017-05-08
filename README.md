# next-format
Opinionated es-next formatter inspired by golang fmt.

Because you should not think about how to format javascript, and you should never debate it, and it's basically scheme in the browser and should look alike.

## install
```
yarn add --dev next-format
```

## usage
In any directory contining `.js` files run `nextformat [path]` in the command line and all the javascript files will be formatted. `path` is optional.
``` bash
> nextformat ./src/
```

## api
``` javascript
import next form 'next-format'
...
// next :: String -> String
next(source) // => FormatedCode
```
