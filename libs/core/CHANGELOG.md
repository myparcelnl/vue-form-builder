# Changelog

<!-- MONODEPLOY:BELOW -->

## [1.0.0-beta.6](///compare/@myparcel-vfb/core@1.0.0-beta.5...@myparcel-vfb/core@1.0.0-beta.6) "@myparcel-vfb/core" (2023-05-31)


### ⚠ BREAKING CHANGES

* **meta:** fix having to use /src in vfb imports (#208)

### Bug Fixes

* **meta:** fix having to use /src in vfb imports ([#208](///issues/208)) 2e52261




## [1.0.0-beta.5](///compare/@myparcel-vfb/core@1.0.0-beta.4...@myparcel-vfb/core@1.0.0-beta.5) "@myparcel-vfb/core" (2023-05-30)




## [1.0.0-beta.4](///compare/@myparcel-vfb/core@1.0.0-beta.3...@myparcel-vfb/core@1.0.0-beta.4) "@myparcel-vfb/core" (2023-05-30)


### Bug Fixes

* include .d.ts files in final package 12a9b7b




## [1.0.0-beta.3](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.2...@myparcel-vfb/core@1.0.0-beta.3) "@myparcel-vfb/core" (2023-05-23)


### Features

* **form:** add more hooks ([#199](https://github/myparcelnl/vue-form-builder/issues/199)) ([ae2ab0e](https://github/myparcelnl/vue-form-builder/commit/ae2ab0e4fbe99d27041f08dc5a6db0f61ffa3e86))




## [1.0.0-beta.2](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.1...@myparcel-vfb/core@1.0.0-beta.2) "@myparcel-vfb/core" (2023-05-11)


### Features

* named slot propagation to wrapper component ([#193](https://github/myparcelnl/vue-form-builder/issues/193)) ([049cdbe](https://github/myparcelnl/vue-form-builder/commit/049cdbe835473677507118172613bbe6acdab795))




## [1.0.0-beta.1](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.0...@myparcel-vfb/core@1.0.0-beta.1) "@myparcel-vfb/core" (2023-05-04)


### Features

* add form stability bit, improved optional validation ([#189](https://github/myparcelnl/vue-form-builder/issues/189)) ([9b964b4](https://github/myparcelnl/vue-form-builder/commit/9b964b4e200feacd8d3734b052e389658861532a))




## [1.0.0-beta.0](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.1...@myparcel-vfb/core@1.0.0-beta.0) "@myparcel-vfb/core" (2023-04-06)


### ⚠ BREAKING CHANGES

* rename <property>Cb to <property>When
* **core:** support form and field wrappers (#84)
* **core:** simplify inner form element
* **core:** rename fieldsWithNamesAndRefs to interactiveFields

### Features

* add option to not pass element as prop to custom elements ([38b007d](https://github/myparcelnl/vue-form-builder/commit/38b007d2e472f0c99ee769d0cb11ab17abcd2580))
* add src to module files ([c14626a](https://github/myparcelnl/vue-form-builder/commit/c14626a2ab1c98464611f83978575a2ce84c53a2))
* **core:** simplify inner form element ([80eb618](https://github/myparcelnl/vue-form-builder/commit/80eb6189bd277f7897b57950b51dacfcfd28f7bb))
* **core:** support form and field wrappers ([#84](https://github/myparcelnl/vue-form-builder/issues/84)) ([12b199f](https://github/myparcelnl/vue-form-builder/commit/12b199fc2677c02fb9a17d434cc67f62f931715c))
* expose useForm and useElement ([a9df264](https://github/myparcelnl/vue-form-builder/commit/a9df2643ead2bd9ca976f1a158761acb4c34cf83))
* **form-builder:** add hooks to register method ([#149](https://github/myparcelnl/vue-form-builder/issues/149)) ([87ef607](https://github/myparcelnl/vue-form-builder/commit/87ef6074fa8e73ce2a4983dd593b23adb2d8520f))
* **form:** add ability to unregister hooks ([#155](https://github/myparcelnl/vue-form-builder/issues/155)) ([c4aa533](https://github/myparcelnl/vue-form-builder/commit/c4aa533e6e43af2f5dc422236eec2da1b4cf0bf1))
* **form:** add method to get a field's value by name ([#169](https://github/myparcelnl/vue-form-builder/issues/169)) ([a558bdb](https://github/myparcelnl/vue-form-builder/commit/a558bdbdfb88df94b474eab1080c686a0df72914))
* **form:** expose html element and emit component events ([7e3c33b](https://github/myparcelnl/vue-form-builder/commit/7e3c33bb9655cd00eb13add07a812667752a9867))
* separate apps and libs ([1bc04c7](https://github/myparcelnl/vue-form-builder/commit/1bc04c7625e0036bb3d72c40f471902e8232ce71))


### Bug Fixes

* **core:** fix component events ([4de71b5](https://github/myparcelnl/vue-form-builder/commit/4de71b5b5faaefc270221c1e14c1debe3dc00a1d))
* **core:** leave adding element props to the user ([9faa181](https://github/myparcelnl/vue-form-builder/commit/9faa181840497fa860bd6aee9d79a90f635788ee))
* **core:** only turn off element prop when value is false ([dd3ebae](https://github/myparcelnl/vue-form-builder/commit/dd3ebaeac88dafe914e81a0764c0f71e4242c3b7))
* **core:** reduce issues with refs sometimes being unwrapped ([fa645cd](https://github/myparcelnl/vue-form-builder/commit/fa645cd03f24c080ccb53ff3d368f8c771d93a64))
* **element:** fix slots property not rendering ([#172](https://github/myparcelnl/vue-form-builder/issues/172)) ([841a9e9](https://github/myparcelnl/vue-form-builder/commit/841a9e99d5f8a06d9d4294bde0a90c6078fe28ed))
* fix computed model in form element ([30fd3da](https://github/myparcelnl/vue-form-builder/commit/30fd3da4dc8f31956fee74ee4ef66057bff2ad74))
* pass element children components ([fb9f819](https://github/myparcelnl/vue-form-builder/commit/fb9f819b4fd7f513bb0e5cb2c41ada8174b2bbc3))
* remove reactive ([9edf168](https://github/myparcelnl/vue-form-builder/commit/9edf168e5499a6d129e5dcaac818c4e3fc1bce99))
* **types:** expose form hook types ([60f7fd4](https://github/myparcelnl/vue-form-builder/commit/60f7fd42fc9428595d1b8364b394c37f61c40b3c))


### Code Refactoring

* **core:** rename fieldsWithNamesAndRefs to interactiveFields ([89f4ab1](https://github/myparcelnl/vue-form-builder/commit/89f4ab1cd1f4cb1d9a6d02cc2c008c4977dad448))
* rename <property>Cb to <property>When ([1bee3ed](https://github/myparcelnl/vue-form-builder/commit/1bee3ed05cd9a8637ddc59689d7195d2a2f8b544))




## [1.0.0-alpha.25](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.24...@myparcel-vfb/core@1.0.0-alpha.25) "@myparcel-vfb/core" (2023-04-06)


### Features

* **form:** add method to get a field's value by name ([#169](https://github/myparcelnl/vue-form-builder/issues/169)) ([a558bdb](https://github/myparcelnl/vue-form-builder/commit/a558bdbdfb88df94b474eab1080c686a0df72914))


### Bug Fixes

* **element:** fix slots property not rendering ([#172](https://github/myparcelnl/vue-form-builder/issues/172)) ([841a9e9](https://github/myparcelnl/vue-form-builder/commit/841a9e99d5f8a06d9d4294bde0a90c6078fe28ed))




## [1.0.0-alpha.22](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.21...@myparcel-vfb/core@1.0.0-alpha.22) "@myparcel-vfb/core" (2023-03-28)


### Features

* **form:** add ability to unregister hooks ([#155](https://github/myparcelnl/vue-form-builder/issues/155)) ([c4aa533](https://github/myparcelnl/vue-form-builder/commit/c4aa533e6e43af2f5dc422236eec2da1b4cf0bf1))




## [1.0.0-alpha.22](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.21...@myparcel-vfb/core@1.0.0-alpha.22) "@myparcel-vfb/core" (2023-03-17)

### Features

- **form:** add ability to unregister hooks ([#155](https://github/myparcelnl/vue-form-builder/issues/155)) ([c4aa533](https://github/myparcelnl/vue-form-builder/commit/c4aa533e6e43af2f5dc422236eec2da1b4cf0bf1))

## [1.0.0-alpha.21](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.20...@myparcel-vfb/core@1.0.0-alpha.21) "@myparcel-vfb/core" (2023-03-17)

## [1.0.0-alpha.20](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.19...@myparcel-vfb/core@1.0.0-alpha.20) "@myparcel-vfb/core" (2023-03-14)

## [1.0.0-alpha.19](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.18...@myparcel-vfb/core@1.0.0-alpha.19) "@myparcel-vfb/core" (2023-03-13)

### Features

- **form-builder:** add hooks to register method ([#149](https://github/myparcelnl/vue-form-builder/issues/149)) ([87ef607](https://github/myparcelnl/vue-form-builder/commit/87ef6074fa8e73ce2a4983dd593b23adb2d8520f))

## [1.0.0-alpha.18](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.17...@myparcel-vfb/core@1.0.0-alpha.18) "@myparcel-vfb/core" (2023-02-27)

### Bug Fixes

- **core:** only turn off element prop when value is false ([dd3ebae](https://github/myparcelnl/vue-form-builder/commit/dd3ebaeac88dafe914e81a0764c0f71e4242c3b7))

## [1.0.0-alpha.17](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.16...@myparcel-vfb/core@1.0.0-alpha.17) "@myparcel-vfb/core" (2023-02-23)

### Features

- **form:** expose html element and emit component events ([7e3c33b](https://github/myparcelnl/vue-form-builder/commit/7e3c33bb9655cd00eb13add07a812667752a9867))

## [1.0.0-alpha.16](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.15...@myparcel-vfb/core@1.0.0-alpha.16) "@myparcel-vfb/core" (2023-02-22)

### Features

- expose useForm and useElement ([a9df264](https://github/myparcelnl/vue-form-builder/commit/a9df2643ead2bd9ca976f1a158761acb4c34cf83))

### Bug Fixes

- fix computed model in form element ([30fd3da](https://github/myparcelnl/vue-form-builder/commit/30fd3da4dc8f31956fee74ee4ef66057bff2ad74))

## [1.0.0-alpha.14](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.13...@myparcel-vfb/core@1.0.0-alpha.14) "@myparcel-vfb/core" (2023-02-21)

## [1.0.0-alpha.13](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.12...@myparcel-vfb/core@1.0.0-alpha.13) "@myparcel-vfb/core" (2023-02-17)

## [1.0.0-alpha.12](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.11...@myparcel-vfb/core@1.0.0-alpha.12) "@myparcel-vfb/core" (2023-02-16)

### Features

- add option to not pass element as prop to custom elements ([38b007d](https://github/myparcelnl/vue-form-builder/commit/38b007d2e472f0c99ee769d0cb11ab17abcd2580))

## [1.0.0-alpha.11](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.10...@myparcel-vfb/core@1.0.0-alpha.11) "@myparcel-vfb/core" (2023-02-07)

### Features

- add src to module files ([c14626a](https://github/myparcelnl/vue-form-builder/commit/c14626a2ab1c98464611f83978575a2ce84c53a2))

### Bug Fixes

- **core:** fix component events ([4de71b5](https://github/myparcelnl/vue-form-builder/commit/4de71b5b5faaefc270221c1e14c1debe3dc00a1d))

## [1.0.0-alpha.10](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.9...@myparcel-vfb/core@1.0.0-alpha.10) "@myparcel-vfb/core" (2023-01-31)

## [1.0.0-alpha.9](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.8...@myparcel-vfb/core@1.0.0-alpha.9) "@myparcel-vfb/core" (2023-01-23)

### Bug Fixes

- pass element children components ([fb9f819](https://github/myparcelnl/vue-form-builder/commit/fb9f819b4fd7f513bb0e5cb2c41ada8174b2bbc3))

## [1.0.0-alpha.8](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.7...@myparcel-vfb/core@1.0.0-alpha.8) "@myparcel-vfb/core" (2023-01-19)

## [1.0.0-alpha.7](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.6...@myparcel-vfb/core@1.0.0-alpha.7) "@myparcel-vfb/core" (2023-01-09)

### ⚠ BREAKING CHANGES

- **core:** rename fieldsWithNamesAndRefs to interactiveFields

### Bug Fixes

- **core:** leave adding element props to the user ([9faa181](https://github/myparcelnl/vue-form-builder/commit/9faa181840497fa860bd6aee9d79a90f635788ee))
- **core:** reduce issues with refs sometimes being unwrapped ([fa645cd](https://github/myparcelnl/vue-form-builder/commit/fa645cd03f24c080ccb53ff3d368f8c771d93a64))

### Code Refactoring

- **core:** rename fieldsWithNamesAndRefs to interactiveFields ([89f4ab1](https://github/myparcelnl/vue-form-builder/commit/89f4ab1cd1f4cb1d9a6d02cc2c008c4977dad448))

## [1.0.0-alpha.6](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.5...@myparcel-vfb/core@1.0.0-alpha.6) "@myparcel-vfb/core" (2023-01-05)

### ⚠ BREAKING CHANGES

- **core:** simplify inner form element

### Features

- **core:** simplify inner form element ([80eb618](https://github/myparcelnl/vue-form-builder/commit/80eb6189bd277f7897b57950b51dacfcfd28f7bb))

## [1.0.0-alpha.5](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.4...@myparcel-vfb/core@1.0.0-alpha.5) "@myparcel-vfb/core" (2023-01-05)

### Bug Fixes

- remove reactive ([9edf168](https://github/myparcelnl/vue-form-builder/commit/9edf168e5499a6d129e5dcaac818c4e3fc1bce99))

## [1.0.0-alpha.4](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.3...@myparcel-vfb/core@1.0.0-alpha.4) "@myparcel-vfb/core" (2023-01-04)

### ⚠ BREAKING CHANGES

- **core:** support form and field wrappers (#84)

### Features

- **core:** support form and field wrappers ([#84](https://github/myparcelnl/vue-form-builder/issues/84)) ([12b199f](https://github/myparcelnl/vue-form-builder/commit/12b199fc2677c02fb9a17d434cc67f62f931715c))

### Bug Fixes

- **types:** expose form hook types ([60f7fd4](https://github/myparcelnl/vue-form-builder/commit/60f7fd42fc9428595d1b8364b394c37f61c40b3c))

## [1.0.0-alpha.3](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.2...@myparcel-vfb/core@1.0.0-alpha.3) "@myparcel-vfb/core" (2023-01-04)

### ⚠ BREAKING CHANGES

- **core:** support form and field wrappers (#84)

### Features

- **core:** support form and field wrappers ([#84](https://github/myparcelnl/vue-form-builder/issues/84)) ([12b199f](https://github/myparcelnl/vue-form-builder/commit/12b199fc2677c02fb9a17d434cc67f62f931715c))

### Bug Fixes

- **types:** expose form hook types ([60f7fd4](https://github/myparcelnl/vue-form-builder/commit/60f7fd42fc9428595d1b8364b394c37f61c40b3c))

## [1.0.0-alpha.2](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.1...@myparcel-vfb/core@1.0.0-alpha.2) "@myparcel-vfb/core" (2022-12-20)

### ⚠ BREAKING CHANGES

- rename <property>Cb to <property>When

### Code Refactoring

- rename <property>Cb to <property>When ([1bee3ed](https://github/myparcelnl/vue-form-builder/commit/1bee3ed05cd9a8637ddc59689d7195d2a2f8b544))

## [1.0.0-alpha.1](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-alpha.0...@myparcel-vfb/core@1.0.0-alpha.1) "@myparcel-vfb/core" (2022-12-19)

### Features

- separate apps and libs ([1bc04c7](https://github/myparcelnl/vue-form-builder/commit/1bc04c7625e0036bb3d72c40f471902e8232ce71))

## [1.0.0-alpha.21](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.20...@myparcel/vue-form-builder@1.0.0-alpha.21) "@myparcel/vue-form-builder" (2022-12-02)

### Bug Fixes

- prevent persistence of old field errors ([d40b64c](https://github/myparcelnl/vue-form-builder/commit/d40b64c332dc93bb0bd46fdfac1de22ffef85d46))

## [1.0.0-alpha.20](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.19...@myparcel/vue-form-builder@1.0.0-alpha.20) "@myparcel/vue-form-builder" (2022-12-02)

### Bug Fixes

- errorsTarget band-aid ([4a93d74](https://github/myparcelnl/vue-form-builder/commit/4a93d74b234c365f7d4fa80fdb40717a4afc90c0))
- errorsTarget, add unit test ([68047ad](https://github/myparcelnl/vue-form-builder/commit/68047ad38d723a916929602b00a4f048fe110102))

## [1.0.0-alpha.19](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.18...@myparcel/vue-form-builder@1.0.0-alpha.19) "@myparcel/vue-form-builder" (2022-12-01)

## [1.0.0-alpha.18](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.17...@myparcel/vue-form-builder@1.0.0-alpha.18) "@myparcel/vue-form-builder" (2022-12-01)

### Bug Fixes

- fix error because variable is unwrapped sometimes ([f652b7a](https://github/myparcelnl/vue-form-builder/commit/f652b7a47eb1c22417a0a54697e2f828415a9fd9))

## [1.0.0-alpha.17](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.16...@myparcel/vue-form-builder@1.0.0-alpha.17) "@myparcel/vue-form-builder" (2022-11-29)

## [1.0.0-alpha.16](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.15...@myparcel/vue-form-builder@1.0.0-alpha.16) "@myparcel/vue-form-builder" (2022-11-29)

### Features

- improve field configurations ([8c61233](https://github/myparcelnl/vue-form-builder/commit/8c612332cf95adc242454195982394d3e61312d9))

## [1.0.0-alpha.15](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.14...@myparcel/vue-form-builder@1.0.0-alpha.15) "@myparcel/vue-form-builder" (2022-11-29)

### Features

- add errorsTarget selector to defineForm ([ad389dd](https://github/myparcelnl/vue-form-builder/commit/ad389ddeb39226899cf7f805bd7d7030e2b53d7e))
- add id, name, label to PlainElement ([c99ca0d](https://github/myparcelnl/vue-form-builder/commit/c99ca0d3a18662a6f77f6370ddb308e9d51d98f2))
- add teleport functionality ([661d9c5](https://github/myparcelnl/vue-form-builder/commit/661d9c565ff48958d3adf3d61ae43ea3aeff5486))

### Bug Fixes

- add SafeTeleport to fix issues ([e4a38bc](https://github/myparcelnl/vue-form-builder/commit/e4a38bc07e55dff224d7dbae8d68448d14fc7660))
- **core:** fix dynamic adding and removing of fields ([4030acd](https://github/myparcelnl/vue-form-builder/commit/4030acdacfbdaa9572b9bde88941bc4531abbfb4))
- defer loading of teleported elements ([2dc849f](https://github/myparcelnl/vue-form-builder/commit/2dc849f01c86edd5e7f1e86e3d3cad46a663bac6))
- don't render teleport if not needed ([170f60b](https://github/myparcelnl/vue-form-builder/commit/170f60b9a4f2658234bdb618907adc7408dc665f))
- ensure errors are reset at plain validation ([d1bc217](https://github/myparcelnl/vue-form-builder/commit/d1bc217f31a24d560e3dc7105e703f88e92eae31))
- reverted usage of SafeTeleport ([c82471b](https://github/myparcelnl/vue-form-builder/commit/c82471b0bacae0b9127522533fe7d1301a885f53))

## [1.0.0-alpha.14](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.13...@myparcel/vue-form-builder@1.0.0-alpha.14) "@myparcel/vue-form-builder" (2022-11-18)

## [1.0.0-alpha.13](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.12...@myparcel/vue-form-builder@1.0.0-alpha.13) "@myparcel/vue-form-builder" (2022-11-18)

## [1.0.0-alpha.12](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.11...@myparcel/vue-form-builder@1.0.0-alpha.12) "@myparcel/vue-form-builder" (2022-11-16)

## [1.0.0-alpha.11](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.10...@myparcel/vue-form-builder@1.0.0-alpha.11) "@myparcel/vue-form-builder" (2022-11-16)

## [1.0.0-alpha.10](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.9...@myparcel/vue-form-builder@1.0.0-alpha.10) "@myparcel/vue-form-builder" (2022-11-15)

### Bug Fixes

- update lots of things ([9604753](https://github/myparcelnl/vue-form-builder/commit/960475357653bc8aaae8f9d1cfd9d2cdba6f2f8b))

## [1.0.0-alpha.9](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.8...@myparcel/vue-form-builder@1.0.0-alpha.9) "@myparcel/vue-form-builder" (2022-11-14)

## [1.0.0-alpha.8](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.7...@myparcel/vue-form-builder@1.0.0-alpha.8) "@myparcel/vue-form-builder" (2022-11-11)

## [1.0.0-alpha.7](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.6...@myparcel/vue-form-builder@1.0.0-alpha.7) "@myparcel/vue-form-builder" (2022-11-11)

## [1.0.0-alpha.6](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.5...@myparcel/vue-form-builder@1.0.0-alpha.6) "@myparcel/vue-form-builder" (2022-11-10)

## [1.0.0-alpha.5](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.4...@myparcel/vue-form-builder@1.0.0-alpha.5) "@myparcel/vue-form-builder" (2022-11-09)

### Bug Fixes

- reactiveness and unit tests ([9ab6e2e](https://github/myparcelnl/vue-form-builder/commit/9ab6e2eefdde38ba1c19660e867e14753d1d5e94))
- reactivity of form fields ([f758ee0](https://github/myparcelnl/vue-form-builder/commit/f758ee028c1456f3c956d158200ed03061a52181))

## [1.0.0-alpha.4](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.3...@myparcel/vue-form-builder@1.0.0-alpha.4) "@myparcel/vue-form-builder" (2022-11-07)

### Bug Fixes

- **core:** update validation ([f6966c9](https://github/myparcelnl/vue-form-builder/commit/f6966c9b531a79261ac7867b6d9c7f04baa399e7))

## [1.0.0-alpha.3](https://github/myparcelnl/vue-form-builder/compare/@myparcel/vue-form-builder@1.0.0-alpha.2...@myparcel/vue-form-builder@1.0.0-alpha.3) "@myparcel/vue-form-builder" (2022-11-07)

### Features

- **core:** add form validator function ([68424a8](https://github/myparcelnl/vue-form-builder/commit/68424a888efe8496a645f1aac56625e9b360674e))
- **core:** add root form submit handler ([3528208](https://github/myparcelnl/vue-form-builder/commit/3528208638dfbc323e6537b4835c793914c38854))
- **core:** change MagicForm tag to form ([cddf1d0](https://github/myparcelnl/vue-form-builder/commit/cddf1d07b86f557b475a6b77bd8020a4555928ca))
- **core:** reset errors array regardless of cache ([7a1b106](https://github/myparcelnl/vue-form-builder/commit/7a1b106adaecbb0c9b3eee263c18b3f648e89487))

### Bug Fixes

- apply lots of fixes ([d2e0f2d](https://github/myparcelnl/vue-form-builder/commit/d2e0f2d195b354b0ba4a58a20e0f5536d4e28746))
- **core:** change id back to name ([d321baa](https://github/myparcelnl/vue-form-builder/commit/d321baa1795dd403f444fd2857c347a71d386fdb))
- **core:** fix incorrect import from shared ([2c97f59](https://github/myparcelnl/vue-form-builder/commit/2c97f59cfaf666cabc5e3681a31e939ea32d236c))
- **core:** fix name instead of id ([47a9757](https://github/myparcelnl/vue-form-builder/commit/47a97576453b3fd5d99e5299c090723680ef0e7d))
- fix lots of issues ([75f3247](https://github/myparcelnl/vue-form-builder/commit/75f32478a10ae584af9edeaa1aae986befb524e7))
