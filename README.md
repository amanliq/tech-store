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

## Avtorizatsiyanin' islew logikası

Avtorizatsiya - klient ta'repindegi jag'daydi basqarıw ushın Zustand ha'm server menen baylanısıw ushın TanStack Query ja'rdeminde a'melge asırıldi.

Tiykarǵı funktsional imkaniyatlar:

1. **Oraylastirilg'an state (jag'day)** – Avtorizatsiya jaǵdayı user store da oraylastırıldi, al avtorizatsiya logikası auth features (`login`, `logout`, `user-sync`) arqalı basqarıldi.
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

## Scalability Approach

The architecture is designed for growth in both features and domains:

1. **Domain isolation** – Features, widgets, and entities are grouped by domain (cart, product, auth), making it easy to add new domains like orders or favorites without affecting existing code.
2. **Feature-level growth** – Features within a domain (e.g., cart: add, remove, update) can grow independently.
3. **Widget reuse** – UI components are domain-oriented and reusable across pages.
4. **Shared utilities** – Common logic and API clients remain centralized, avoiding duplication.
5. **Future layering** – If the project becomes larger, domains can be split into stricter layers (entities, features, widgets) without rewriting existing logic.

**Overall reasoning:**  
The structure balances **clarity, maintainability, and speed of development**, while remaining flexible for new domains, features, or complex UI interactions.

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

1. **Centralized state** – Auth state is centralized in the user store, while auth logic is handled through auth features (`login`, `logout`, `user-sync`).

2. **Session persistence** – `AuthProvider` calls `useUserSync` on app start to fetch and sync the current user, and logs out if the user token is invalid or the request fails..
3. **Protected routes** – `AuthGuard` ensures that only authorized users can access sensitive pages like the cart.
4. **Pending actions** – When a non-authorized user tries to add a product to the cart:
   - The action is stored in `usePendingActionsStore` and the user is redirected to login.
   - After login via `useLogin`, the stored pending action is executed .
   - This logic is centralized in auth features.

**Reasoning for this approach:**

**Reasoning for this approach:**

- Auth-related logic is kept in one place, while UI components focus only on rendering.
- Login, logout, and user sync flows are clear and easy to follow.
- In the future, it becomes easier to extend and modify the authorization logic.

## Scalability Approach

The architecture is designed for growth in both features and domains:

1. **Domain isolation** – Features, widgets, and entities are grouped by domain (cart, product, auth), making it easy to add new domains like orders or favorites without affecting existing code.
2. **Feature-level growth** – Features within a domain (e.g., cart: add, remove, update) can grow independently.
3. **Widget reuse** – UI components are domain-oriented and reusable across pages.
4. **Shared utilities** – Common logic and API clients remain centralized, avoiding duplication.
5. **Future layering** – If the project becomes larger, domains can be split into stricter layers (entities, features, widgets) without rewriting existing logic.

**Overall reasoning:**  
The structure balances **clarity, maintainability, and speed of development**, while remaining flexible for new domains, features, or complex UI interactions.
