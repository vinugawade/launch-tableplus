# `@ur-pkg/launch-tableplus`

<h1 align="center">
    <img src="logo.png" alt="logo" width="200">
</h1>

 ![GitHub package.json version](https://img.shields.io/github/package-json/v/vinugawade/launch-tableplus?style=flat-square) ![GitHub Repo stars](https://img.shields.io/github/stars/vinugawade/launch-tableplus?color=yellow&style=flat-square) ![GitHub forks](https://img.shields.io/github/forks/vinugawade/launch-tableplus?color=white&style=flat-square)
![MacOS](https://img.shields.io/badge/MacOS-white?style=flat-square&logo=apple&logoColor=black)
![JS](https://img.shields.io/badge/JavaScript-white?style=flat-square&logo=javascript&logoColor=black)
![GitHub issues](https://img.shields.io/github/issues/vinugawade/ms-bkp?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/vinugawade/ms-bkp?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/vinugawade/ms-bkp?style=flat-square)

🚀 **@ur-pkg/launch-tableplus** is a handy Lando plugin for seamlessly managing your databases using the powerful `TablePlus` GUI. This tool bridges the gap between your Lando-managed environments and TablePlus, allowing you to open your database with ease!

## ✨ Features

- 🎛 **Supports multiple databases**: MySQL, MariaDB, PostgreSQL, and more!
- ⚡ **Quick access**: Launch your database GUI in a single command.
- 🖥 **Cross-platform**: Works on `macOS` and `Windows`.
- 🔗 **Automatic configuration**: Detects and sets up database connection details for you.

## 📦 Installation

### Add from NPM

```bash
lando plugin-add @ur-pkg/launch-tableplus
```

### Remove plugin

```bash
lando plugin-remove launch-tableplus
```

> **Note:** Ensure that [TablePlus](https://tableplus.com/) is installed on your system.

## 🔧 Usage

1. **Ensure your Lando environment is running:**

   > **Note:** After installing the plugin, restart your Lando environment to apply the changes properly.

   ```bash
   lando start
   ```

2. **Launch TablePlus:**

   ```bash
   lando tableplus
   ```

   - By default, it will auto-detect your database services.
   - Use the `--service` flag to specify a particular database service:

     ```bash
     lando tableplus --service database
     ```

## 🛠 Configuration

This plugin works out of the box, but you can customize the behavior using Lando's configuration system. Add the following to your `.lando.yml` file if needed:

```yaml
services:
  database:
    type: mariadb
    portforward: true
```

## 🐛 Troubleshooting

- **Error: Unsupported operating system**:
  - Currently, only `macOS` and `Windows` are supported.
- **Error: No matching database service found**:
  - Ensure your `.lando.yml` file has a configured database service.

## 🤝 Contributing

We welcome contributions! Feel free to submit issues or pull requests on [GitHub](https://github.com/vinugawade/launch-tableplus/issues).

## ✨ Maintainer

**`@ur-pkg/launch-tableplus`** is built with 💛 by [Vinay Gawade](https://github.com/vinugawade).

Your support and feedback are valuable in maintaining and improving the plugin.

<a href="https://www.buymeacoffee.com/vinaygawade" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## 📜 License

This project is licensed under the [GPL-3.0-or-later](LICENSE) license.

## 🙌 Acknowledgments

Big thanks to the [Lando](https://lando.dev/) and [TablePlus](https://tableplus.com/) communities for making development easier for everyone!

Happy coding with `@ur-pkg/launch-tableplus`! 🚀
