# LibraryX

A personal book library app. Sign in, add books by searching Google Books by title or ISBN, and track what you're reading, what you've finished and what you thought about it.

**Live demo:** [libraryex.netlify.app](https://libraryex.netlify.app/)

## Features

- **Authentication**: email/password, Google and Facebook sign-in via Firebase Auth. Protected routes for the library, public-only routes for sign-in/sign-up.
- **Add books from Google Books**: search by title (up to 40 results) or by ISBN, then review and edit the pre-filled form before saving.
- **Manual entry and editing**: every field (title, authors, publisher, pages, series, volume, categories, summary) can be edited after adding.
- **Reading tracking**: mark books as read, set start and end dates, keep personal notes.
- **Browse your library**: search by title, filter by *All / Currently reading / Read*, sort by date added or alphabetically.
- **Per-user data**: each user sees only their own books, stored in Cloud Firestore.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript, Material UI, CSS Modules |
| Routing | React Router |
| Auth & data | Firebase Authentication, Cloud Firestore |
| External API | Google Books API (via Axios) |
| Tooling | Vite, ESLint |
| Hosting | Netlify |

## Implementation notes

- **API data normalization**: raw Google Books responses are validated with a type guard and mapped into the app's `Book` type (`src/apiUtils`), with fallbacks for missing authors, ISBNs and cover images.
- **Typed Firestore converter**: `userBookConverter` maps Firestore documents to `UserBook` objects, normalizes legacy data (numeric page counts, old placeholder images) and strips the `id` on write.
- **Pure filtering pipeline**: status filter → title search → sort are small pure functions in `src/utils/booksPipeline.ts`, composed in a `useMemo` on the home page.
- **Auth context**: a single `AuthProvider` subscribes to `onAuthStateChanged`, and the `ProtectedRoute` / `PublicOnlyRoute` wrappers redirect based on its state.

## Project structure

```
src/
├── apiUtils/        # Google Books requests and response mapping
├── auth/            # AuthContext, ProtectedRoute, PublicOnlyRoute
├── components/      # AddBook, BooksList, BooksFilterBar, UserBook, Sign…
├── config/          # Firebase init + Firestore converter
├── firebaseUtils/   # auth error handling
├── pages/           # route-level components
├── types/           # Book, UserBook, API response types
└── utils/           # filtering and sorting pipeline
```

## Getting started

```bash
git clone https://github.com/damianprog/libraryx.git
cd libraryx
npm install
```

Create a `.env` file in the project root with a Google Books API key:

```
VITE_GOOGLE_API_KEY=your_key_here
```

Then run:

```bash
npm run dev        # start dev server
npm run build      # type-check and build for production
npm run lint       # run ESLint
```

The app uses the Firebase project configured in `src/config/firebase.ts`. To use your own, replace that config and enable Email/Password, Google and Facebook providers in Firebase Authentication.
