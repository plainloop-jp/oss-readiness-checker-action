# OSS Readiness Checker Action

Run [OSS Readiness Checker](https://github.com/plainloop-jp/oss-readiness-checker)
automatically in GitHub Actions.

## Usage

Add this step after `actions/checkout`:

```yaml
- uses: plainloop-jp/oss-readiness-checker-action@v0.3.1
```

By default, the action checks the repository root. Use `path` when the project
is inside a subdirectory:

```yaml
- uses: plainloop-jp/oss-readiness-checker-action@v0.3.1
  with:
    path: ./packages/example
```

## Example

OSS Readiness Checker uses this Marketplace action in its own CI. See the
[workflow file](https://github.com/plainloop-jp/oss-readiness-checker/blob/main/.github/workflows/ci.yml)
and [workflow runs](https://github.com/plainloop-jp/oss-readiness-checker/actions/workflows/ci.yml).

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

For security reports, see [SECURITY.md](SECURITY.md).
