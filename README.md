# gclone

Better git clone. Type less, clone more.

## Quick Start

```bash
$ npm install -g gclone
$ gclone creaturephil/markus
```

## Documentaion

### gclone (repo or variable) [optional - name]

Clones the repo as the repo name or to a given name.

###### Example

```bash
$ gclone npm/npm
$ gclone variable
```

### gclone set <name> <repo>

Saves a variable to a repo for later use.

###### Example

```bash
$ gclone set variable variable/repo
$ gclone set express strongloop/express
```

### gclone list

List all variables set.

###### Example

```bash
$ gclone list
```

### gclone remove <variable>

Remove a variable.

###### Example

```bash
$ gclone remove variable
```

### [License (MIT)](LICENSE)
