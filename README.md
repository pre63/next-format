# next-format
Opinionated es-next formatter inspired by golang fmt.

## install
```
yarn add --dev next-format
```

## usage
In any directory containing `.js` files run `nextformat [path]` in the command line and all the javascript files will be formatted. `path` is optional.
``` bash
> nextformat ./src/
```

## api
``` javascript
import next from 'next-format'
...
// next :: String -> String
next(source) // => FormatedCode
```
