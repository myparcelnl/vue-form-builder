# Changelog

<!-- MONODEPLOY:BELOW -->

## [1.0.0-beta.40](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.39...@myparcel-vfb/core@1.0.0-beta.40) "@myparcel-vfb/core" (2024-03-13)


### ⚠ BREAKING CHANGES

* **npm:** may break imports and/or cause new build errors

### Bug Fixes

* **npm:** fix builds and exports ([3aa81f2](https://github/myparcelnl/vue-form-builder/commit/3aa81f2d3fc0017693e8b279af7211d45cd5b479))




## [1.0.0-beta.39](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.38...@myparcel-vfb/core@1.0.0-beta.39) "@myparcel-vfb/core" (2024-02-07)


### Bug Fixes

* **field:** remove fields from the form when unmounted ([#233](https://github/myparcelnl/vue-form-builder/issues/233)) ([8aa462c](https://github/myparcelnl/vue-form-builder/commit/8aa462cdfa70cf9934982bada0160c5b097273ce))




## [1.0.0-beta.38](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.37...@myparcel-vfb/core@1.0.0-beta.38) "@myparcel-vfb/core" (2024-01-26)


### Performance Improvements

* replace get with toValue ([2185f6f](https://github/myparcelnl/vue-form-builder/commit/2185f6f15cf8169879d64a9ac122380557f17a29))




## [1.0.0-beta.37](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.36...@myparcel-vfb/core@1.0.0-beta.37) "@myparcel-vfb/core" (2024-01-25)


### Bug Fixes

* **form:** fix form attributes not being passed through ([b9bc187](https://github/myparcelnl/vue-form-builder/commit/b9bc1871c9d1716432fe81559f725eb19bdc65e7))




## [1.0.0-beta.36](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.35...@myparcel-vfb/core@1.0.0-beta.36) "@myparcel-vfb/core" (2024-01-11)


### Bug Fixes

* **field:** fix errors not being unwrapped before passing through slots ([b5d06b4](https://github/myparcelnl/vue-form-builder/commit/b5d06b49c9364ecd30f3eafbebd13d0c0b691fec))
* **field:** fix not all default validators being executed ([a1f8c85](https://github/myparcelnl/vue-form-builder/commit/a1f8c8538c01eadcb81ec3b1131faf094af665e1))




## [1.0.0-beta.35](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.34...@myparcel-vfb/core@1.0.0-beta.35) "@myparcel-vfb/core" (2024-01-10)


### Bug Fixes

* **field:** remove the need for wrapper:false in createField ([#229](https://github/myparcelnl/vue-form-builder/issues/229)) ([86aa72c](https://github/myparcelnl/vue-form-builder/commit/86aa72cf33d1e81b816c9e30fcc30539778651c6))
* **form:** fix setValue not working occasionally ([#228](https://github/myparcelnl/vue-form-builder/issues/228)) ([bf2d9c5](https://github/myparcelnl/vue-form-builder/commit/bf2d9c59adeede43529c9dc946c4cdb8070839d5))




## [1.0.0-beta.34](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.33...@myparcel-vfb/core@1.0.0-beta.34) "@myparcel-vfb/core" (2024-01-10)




## [1.0.0-beta.33](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.32...@myparcel-vfb/core@1.0.0-beta.33) "@myparcel-vfb/core" (2024-01-04)


### Bug Fixes

* allow falsy values to be used for initial values ([c6d6539](https://github/myparcelnl/vue-form-builder/commit/c6d6539eb6ae3d3c93932032cb4eccbeb0df7c6b))
* **types:** make CreatedForm parameter optional ([4d1f080](https://github/myparcelnl/vue-form-builder/commit/4d1f080ec92c05f66f9dc7ba9431b96934d7d4b2))




## [1.0.0-beta.32](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.31...@myparcel-vfb/core@1.0.0-beta.32) "@myparcel-vfb/core" (2023-12-22)


### Features

* **form:** do not throw errors on setValue on undefined field ([#227](https://github/myparcelnl/vue-form-builder/issues/227)) ([61f66f7](https://github/myparcelnl/vue-form-builder/commit/61f66f77fa91e1ed85f1d2a75a49599260cc45fe))




## [1.0.0-beta.31](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.30...@myparcel-vfb/core@1.0.0-beta.31) "@myparcel-vfb/core" (2023-12-18)


### Bug Fixes

* preserve children slot composition ([#223](https://github/myparcelnl/vue-form-builder/issues/223)) ([5147ffa](https://github/myparcelnl/vue-form-builder/commit/5147ffa8d39334944b8a498d6d23a3797dfacc90))




## [1.0.0-beta.30](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.29...@myparcel-vfb/core@1.0.0-beta.30) "@myparcel-vfb/core" (2023-12-11)


### Bug Fixes

* **core:** remove component children ([5ea273d](https://github/myparcelnl/vue-form-builder/commit/5ea273d27c00fd203a84fdbf0239e8821ca109b5))
* **core:** update slots type ([10c7bff](https://github/myparcelnl/vue-form-builder/commit/10c7bffe4e5f996c03b66c9ece5847f95b51c190))
* spread children array ([11f7add](https://github/myparcelnl/vue-form-builder/commit/11f7add5367f2aa464995e53f2d87550102ae7d5))




## [1.0.0-beta.29](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.28...@myparcel-vfb/core@1.0.0-beta.29) "@myparcel-vfb/core" (2023-12-07)


### Bug Fixes

* **types:** fix type errors ([93389d0](https://github/myparcelnl/vue-form-builder/commit/93389d01c20e05c4bb76e97d44f663c0b1956177))




## [1.0.0-beta.28](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.27...@myparcel-vfb/core@1.0.0-beta.28) "@myparcel-vfb/core" (2023-12-07)


### Bug Fixes

* **types:** add missing types to interface ([a4b4942](https://github/myparcelnl/vue-form-builder/commit/a4b494227bed45046e6c899937238c697d969f9a))




## [1.0.0-beta.27](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.26...@myparcel-vfb/core@1.0.0-beta.27) "@myparcel-vfb/core" (2023-12-07)




## [1.0.0-beta.26](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.25...@myparcel-vfb/core@1.0.0-beta.26) "@myparcel-vfb/core" (2023-12-06)


### Bug Fixes

* fix circular imports ([0d4a4d4](https://github/myparcelnl/vue-form-builder/commit/0d4a4d43d4bd62b922dedeab4b965bd27105c693))
* improve and speed up field types ([#222](https://github/myparcelnl/vue-form-builder/issues/222)) ([d8242ac](https://github/myparcelnl/vue-form-builder/commit/d8242acfe7297633bab4e52e86456ee000b7d0d5))




## [1.0.0-beta.25](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.24...@myparcel-vfb/core@1.0.0-beta.25) "@myparcel-vfb/core" (2023-12-05)


### Bug Fixes

* do not use or export symbols directly ([212d34c](https://github/myparcelnl/vue-form-builder/commit/212d34ca6f2f9a3c907da83d254150a092c33d6d))




## [1.0.0-beta.24](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.23...@myparcel-vfb/core@1.0.0-beta.24) "@myparcel-vfb/core" (2023-11-29)


### Bug Fixes

* fix element props being bound too early ([bad1935](https://github/myparcelnl/vue-form-builder/commit/bad1935f9d724539abc1b930c04a9122430bb689))




## [1.0.0-beta.23](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.22...@myparcel-vfb/core@1.0.0-beta.23) "@myparcel-vfb/core" (2023-11-28)


### Features

* add typed computed values property to form ([#221](https://github/myparcelnl/vue-form-builder/issues/221)) ([5880bca](https://github/myparcelnl/vue-form-builder/commit/5880bcacf9dc3a1dee395c3486211ccc6cb231c0))




## [1.0.0-beta.22](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.21...@myparcel-vfb/core@1.0.0-beta.22) "@myparcel-vfb/core" (2023-11-25)


### Bug Fixes

* fix type checking of the children before mapping ([#220](https://github/myparcelnl/vue-form-builder/issues/220)) ([5b134d0](https://github/myparcelnl/vue-form-builder/commit/5b134d0186e7fc0a3ac29586f5d970f9e3d594da))




## [1.0.0-beta.21](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.20...@myparcel-vfb/core@1.0.0-beta.21) "@myparcel-vfb/core" (2023-11-25)


### Bug Fixes

* remove reactive from created form instance ([9937ea2](https://github/myparcelnl/vue-form-builder/commit/9937ea2ecb3dd0f65bc42f9fa1a640d151cb66ca))




## [1.0.0-beta.20](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.19...@myparcel-vfb/core@1.0.0-beta.20) "@myparcel-vfb/core" (2023-11-24)


### Bug Fixes

* pass elements through FormElement ([c2443ca](https://github/myparcelnl/vue-form-builder/commit/c2443ca5fe0d60f6f1fa64196dde54e43a1224a7))




## [1.0.0-beta.19](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.18...@myparcel-vfb/core@1.0.0-beta.19) "@myparcel-vfb/core" (2023-11-23)


### Bug Fixes

* fix events not being attached to element ([0ac7afa](https://github/myparcelnl/vue-form-builder/commit/0ac7afa2691231aacd53be565f9ae20096648993))




## [1.0.0-beta.18](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.17...@myparcel-vfb/core@1.0.0-beta.18) "@myparcel-vfb/core" (2023-11-21)


### Bug Fixes

* fix broken import ([eab4fcc](https://github/myparcelnl/vue-form-builder/commit/eab4fcc4585c6e7cfb10c43a59fcea107951272d))




## [1.0.0-beta.17](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.16...@myparcel-vfb/core@1.0.0-beta.17) "@myparcel-vfb/core" (2023-11-21)


### Features

* add new way of declaring forms ([#218](https://github/myparcelnl/vue-form-builder/issues/218)) ([9546c82](https://github/myparcelnl/vue-form-builder/commit/9546c82d29716cc269fe6731ff682f0670beec7a))


### Bug Fixes

* **imports:** correct barrel import ([6a55317](https://github/myparcelnl/vue-form-builder/commit/6a55317818eb6a35dd1a6d8bdec8fd00cfffef8c))




## [1.0.0-beta.16](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.15...@myparcel-vfb/core@1.0.0-beta.16) "@myparcel-vfb/core" (2023-09-28)


### Bug Fixes

* **consts:** move constants to central location ([3469e2a](https://github/myparcelnl/vue-form-builder/commit/3469e2ad07e63f01ddae02bf18b134cce48016db))




## [1.0.0-beta.15](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.14...@myparcel-vfb/core@1.0.0-beta.15) "@myparcel-vfb/core" (2023-09-28)


### Bug Fixes

* **imports:** move non-type exports to separate files ([dd2b89f](https://github/myparcelnl/vue-form-builder/commit/dd2b89f40bd1bc3de0ecb18fa9b48a4f49c3fdb7))




## [1.0.0-beta.12](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.11...@myparcel-vfb/core@1.0.0-beta.12) "@myparcel-vfb/core" (2023-08-25)


### Features

* **element:** make props and attributes reactive ([#214](https://github/myparcelnl/vue-form-builder/issues/214)) ([bfe313f](https://github/myparcelnl/vue-form-builder/commit/bfe313f96ee02eadc33ba7cae2f39b2fd8757676))




## [1.0.0-beta.11](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.10...@myparcel-vfb/core@1.0.0-beta.11) "@myparcel-vfb/core" (2023-06-30)


### Features

* **element:** add readonly functionality ([#210](https://github/myparcelnl/vue-form-builder/issues/210)) ([4fa3166](https://github/myparcelnl/vue-form-builder/commit/4fa3166d0acecfd99dbfb97a3e542adf422eb2e7))




## [1.0.0-beta.10](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.9...@myparcel-vfb/core@1.0.0-beta.10) "@myparcel-vfb/core" (2023-06-30)




## [1.0.0-beta.9](https://github/myparcelnl/vue-form-builder/compare/@myparcel-vfb/core@1.0.0-beta.8...@myparcel-vfb/core@1.0.0-beta.9) "@myparcel-vfb/core" (2023-06-07)


### Bug Fixes

* **types:** allow passing return type to some form methods ([1cce5c0](https://github/myparcelnl/vue-form-builder/commit/1cce5c0c83164c27c6e281aeaeffa8ea660d8071))




## [1.0.0-beta.8](///compare/@myparcel-vfb/core@1.0.0-beta.7...@myparcel-vfb/core@1.0.0-beta.8) "@myparcel-vfb/core" (2023-06-06)


### Features

* **form:** add getField, setValue and setValues methods ([#209](///issues/209)) 9ff246b




## [1.0.0-beta.7](///compare/@myparcel-vfb/core@1.0.0-beta.6...@myparcel-vfb/core@1.0.0-beta.7) "@myparcel-vfb/core" (2023-06-05)




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
