## Proekt arxitekturası hám moduller strukturası

Proekt React 18, Vite, React Router v6, Tailwind ha'm Zustand texnologiyaları tiykarında qurılg'an.

Feature-Sliced Design (FSD) usillarinan paydalanilg'an

Top-level layers

- **app** – qosimshani iske tu'siriw bo'limi, strukturalıq maketler, provayderler, marshrutlaw, ha'm ulıwma stiller.
- **pages** – qosımshanın' tolıq betleri (marshrutlarǵa baylanısqan).
- **features** -domenlerge bo'lingen funksional imkaniyatlar (mısalı: sebetke qosıw, tovarlardı saralaw, sistemag'a kiriw).
- **entities** –biznes-modeller (cart, product, user) ha'm mag'lıwmatlar strukturası.
- **widgets** – UI blokları: domenlerge bo'lingen (cart, product) ha'm uliwma maket elementleri (header).
- **shared** – qayta qollanılatuǵın funksiyalar: API servisleri ha'm domenge baylanıslı bolmag'an UI elementleri.

```
src/
├── app/
│   ├── providers/          # AuthProvider, QueryProvider
│   ├── router/             # Route configuration, routes
│   └── layouts/            # MainLayout,
│
├── pages/
│   ├── home/               # Product catalog page
│   ├── login/              # Login page
│   ├── product/detail      # Product detail page
│   └── cart/               # Cart page (protected)
│
├── features/
│   ├── auth/
│   │   ├── login/          # Login form feature
│   │   ├── logout/         # Logout button feature
|   |   |── pending-actions # Pending actions feature
│   │   └── user-sync/      # Session restoration feature
|   |
│   │
│   ├── cart/
│   │   ├── add-to-cart/    # Add to cart with auth guard
│   │   ├── remove-from-cart/
|   |   ├── clear-cart/
│   │   └── update-cart-quantity/
│   │
│   └── product/
│       └── filter-product/
│
├── entities/
│   ├── user/               # User model, store, queries,apis, types
│   ├── product/            # Product model, queries,apis, types
│   └── cart/               # Cart model, store, types
│
├── widgets/
│   ├── cart/
│   │   ├── list/           # Cart items list widget
│   │   └── summary/        # Cart total & checkout summary
│   │
│   ├── header/             # App header with navigation
│   │
│   └── product/
│       ├── catalog/        # Product catalog grid
│       ├── detail/         # Product detail view
│       ├── gallery/        # Product image gallery
│       └── list/           # Product list component
│
└─── shared/
    ├── ui/                 # Button, Input,...
    ├── api/                # HTTP client, base config
    └── lib/                # Utilities and helpers
        ├── classNames.ts   # CSS class utilities
        └── tokenService.ts # Token storage management


```

## Avtorizatsiyanin' islew logikası

Avtorizatsiya - klient ta'repindegi jag'daydi basqarıw ushın Zustand ha'm server menen baylanısıw ushın TanStack Query ja'rdeminde a'melge asırıldi.

Tiykarǵı funktsional imkaniyatlar:

1. **Oraylastirilg'an state (jag'day)** – Avtorizatsiya jaǵdayı user store da oraylastırıldi, token persistence `tokenService` arqalı saqlanadı, al avtorizatsiya logikası auth features (`login`, `logout`, `user-sync`) arqalı basqarıldi.
2. **Session persistence** – `AuthProvider` paydalaniwshi mag'lumatlarin aliw ha'm sinxronlaw ushun `useUseSync` hook ti isletedi egerde paydlaniwshi token eskirgen bolsa yamasa serverden qa'telik (error) kelse profileden shig'ariladi.
3. **Protected routes** – `AuthGuard` `cart` ha'm basqa qorg'alg'an marshrutlarg'a tek avtorizatsiyadan o'tken paydalanıwshılarg'a ruxsat beriwdi ta'miyinleydi.

4. **Pending actions** – Avtorizatsiyadan o'tpegen paydalanıwshı produkttı cart-qa qosiwg'a urıng'anda:
   - Bul háreket (action) `usePendingActionsStore`da saqlanadi ha'm login betine o'tkiziledi.
   - Login bolg'annan keyin `usePendingActionsStore` da saqlang'an actionlar orinlanadi.
   - Bul logika auth features bo'limine oraylastirilg'an.

**Nege usı jol tan'lang'anı:**

- Avtorizatsiya menen baylanıslı logikalar bir jerde saqlanadı, UI komponentler tek rendering menen shug'illanadi .
- Login, logout, user sync sıyaqlı processler anıq ha'm tu'sinikli boladı.
- Keleshekte avtorizatsiya logikasın ken'eytiw ha'm o'zgeris kirgiziw an'satlaw boladi
- `tokenService` ha'zirde auth tokendi localstorage de saqlaydi keyinshelik eger o'zgertemen dese sol jerdi g'ana o'zgertip qoysa boladi. (misali:security jag'inan cookiede httponly qilaman dese eger kelshekte )

## Masshtablastırıw usılları.

1. **Feature-Level Growth **
   - **Vertikal:** Ha'r bir feature o'z ishinde quramalasıp barsa da, óz aldına (self-contained) qaladı.  
     Misali:

     ```
     features/cart/add-to-cart/
     features/cart/remove-from-cart/
     features/cart/update-cart-quantity/
     features/auth/login/
     features/auth/logout/
     features/auth/user-sync/

     ```

     - Ha'r bir feature `ui`, `model`, `api`, etc., strukturasina iye ha'm basqa featurelarg'a ta'sir etpeydi.

   - **Gorizontal:** Jan'a feature-ler ha'm domenler g'a'rezsiz tu'rde qosıla beredi, bul proekttin' (app) mashtabın ken'eytiwge imkaniyat beredi.

     Mısalı: `features/cart/clear-cart/` yamasa `features/product/reviews/` sıyaqlı jan'a funksiyalardı qosqanda, bar bolg'an featurelardi o'zgertiwdi talap etpeydi.

2. **Widget-Level Growth**
   Vidjetler jan'a UI elementleri yamasa ishki (nested) komponentler qosılıwı esabinan vertikal ha'm gorizontal ken'eye aladi .

   Misali:

   ```
   widgets/cart/list/
   widgets/cart/summary/
   widgets/product/catalog/
   widgets/product/detail/
   widgets/product/gallery/

   ```

3. **Page-Level Scalability**
   - Misali:

     ```
     pages/home/
     pages/product/detail/
     pages/cart/

     ```

4. **Shared Utilities**
   - Ulıwma logika, UI primitivleri ha'm API-klientler shared qatlamında oraylastırılg'an; bul kod ta'kirarlanıwın saplastıradı ha'm feature, widget ha'm pages qatlamlarinda birdey ta'rizde ken'eyiwine imkaniyat beredi

     ```
     shared/ui/
     shared/lib/
     shared/api/

     ```

5. **Entities Layer (Vertical & Horizontal Scaling)**
   - Ha'r bir entity (mısalı: user, product) ishki jaqtan (vertikal) o'se aladı ha'm jan'a entity-ler bir-birine baylanıssız tu'rde (gorizontal) qosılıp barıla beredi.

     Misali:

     ```
     entities/user/
       ├─ model/
       ├─ ui/
       └─ api/
     ```

## Project Architecture and Module Structure

The project is built with React 18, Vite, React Router v6, Tailwind, and Zustand.

It follows a Feature-Sliced Design (FSD) principles

Top-level layers

- **app** – app entry, layouts, providers, routing, global styles.
- **pages** – route-level pages.
- **features** – user actions grouped by domain (cart, product, auth).
- **entities** – business models (cart, product, user) and data handling.
- **widgets** – UI blocks grouped by domain (cart, product, header).
- **shared** – reusable utilities, API client, UI components.

Features and widgets are grouped by domain to improve cohesion and maintainability.

## Authorization Scenario

Authorization is implemented using Zustand for client state and TanStack Query for server interactions.

Key points:

1. **Centralized state** – Auth state is centralized in the user store with token persistence handled by a separate `tokenService`, while auth logic is handled through auth features (`login`, `logout`, `user-sync`).

2. **Session persistence** – `AuthProvider` calls `useUserSync` on app start to fetch and sync the current user, and logs out if the user token is invalid or the request fails..
3. **Protected routes** – `AuthGuard` ensures that only authorized users can access sensitive pages like the cart.
4. **Pending actions** – When a non-authorized user tries to add a product to the cart:
   - The action is stored in `usePendingActionsStore` and the user is redirected to login.
   - After login via `useLogin`, the stored pending action is executed .
   - This logic is centralized in auth features.

**Reasoning for this approach:**

- Auth-related logic is kept in one place, while UI components focus only on rendering.
- Login, logout, and user sync flows are clear and easy to follow.
- In the future, it becomes easier to extend and modify the authorization logic.
- The `tokenService` currently persists the auth token in localStorage. This centralized approach ensures that any future security upgrades—such as migrating to HttpOnly cookies—can be implemented solely within this service without affecting the rest of the application.

## Scalability Approach

1. **Feature-Level Growth**
   - **Vertical Scaling:** Each feature grows internally by adding complexity while staying self-contained.  
     Example:

     ```
     features/cart/add-to-cart/
     features/cart/remove-from-cart/
     features/cart/update-cart-quantity/
     features/auth/login/
     features/auth/logout/
     features/auth/user-sync/
     features/product/
     ```

     - Each feature can have its own `ui`, `model`, `api`, etc., without affecting others.

   - **Horizontal Scaling:** New features or domains can be added independently, enabling app expansion.  
     Example: Adding `features/cart/clear-cart/` or `features/product/reviews/` does not require modifying existing features.

2. **Widget-Level Growth**
   - Widgets can scale both vertically and horizontally by incorporating additional UI elements or internal nested components.  
     Example:

   ```
   widgets/cart/list/
   widgets/cart/summary/
   widgets/product/catalog/
   widgets/product/detail/
   widgets/product/gallery/
   widgets/header/
   ```

3. **Page-Level Scalability**
   Example:

   ```
   pages/home/
   pages/product/detail/
   pages/cart/

   ```

4. **Shared Utilities**
   - Common logic, UI primitives, and API clients are centralized in the shared layer, eliminating duplication and enabling seamless scaling across features, widgets, and pages::

     ```
     shared/ui/
     shared/lib/
     shared/api/

     ```

5. **Entities Layer**
   - Each entity (e.g., `user`, `product`) can grow internally (vertical) and new entities can be added independently (horizontal).  
     Example:
     ```
     entities/user/
       ├─ model/
       ├─ ui/
       └─ api/
     ```
