# frontend jscodeshift scripts repository

jscodeshift의 codemod script를 저장하는 저장소입니다.

## dry-run

```bash
$ yarn jscodeshift -t scripts/script.ts ./pages/**/*.tsx --parser=tsx --dry
```

## transform

```bash
$ yarn jscodeshift -t scripts/script.ts ./pages/**/*.tsx --parser=tsx
```
