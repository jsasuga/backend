'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' : 'data-target="#xs-controllers-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' :
                                            'id="xs-controllers-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' : 'data-target="#xs-injectables-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' :
                                        'id="xs-injectables-links-module-AppModule-24f2efc4d5e83e20b0e65c8fa8b3b78b726c2ce7faace23d8e3036c1297fb76f9dd05ec2fdae9ca30b5cf5af1c86c455d08db508ba3798716c6b5fa36be94c50"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' : 'data-target="#xs-controllers-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' :
                                            'id="xs-controllers-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' : 'data-target="#xs-injectables-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' :
                                        'id="xs-injectables-links-module-AuthModule-a1cbbad3788536c5e37515ffd2ee5150ce2e4625f10cabe7f5be12cd1177f66718b553616b171f90248fb579e0c237db79c801e7be35c168dd9ee8ba9e87647d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthHelper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthHelper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' : 'data-target="#xs-controllers-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' :
                                            'id="xs-controllers-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' : 'data-target="#xs-injectables-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' :
                                        'id="xs-injectables-links-module-RoleModule-bac494885d41f00052c64c00b816e65a52b184a4e115fb9d1766a1fdc2d2e143588613b19b88a55ce37958163bab8ddf9ee6ff2c8f25854e840dc8ffd3b5a4a8"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' : 'data-target="#xs-controllers-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' :
                                            'id="xs-controllers-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' : 'data-target="#xs-injectables-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' :
                                        'id="xs-injectables-links-module-UserModule-112ac34f57a8e2e9ea902d62a326d4055a638784147f2c840085b766025ef0d5df23bda2445c9e2a07e3b6e1963b3dc1ce76dd5584a7c771c00386beb3be8c00"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNameDto.html" data-type="entity-link" >UpdateNameDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypeOrmConfigService.html" data-type="entity-link" >TypeOrmConfigService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});