# seqno-site

The homepage for [seqno](https://github.com/AVGVSTVS96/seqno), live at [seqno.vercel.app](https://seqno.vercel.app). The web app itself is at [seqno.vercel.app/app](https://seqno.vercel.app/app/): `site/public/vercel.json` rewrites `/app/*` to the app's own Vercel project, so the page and the app share an origin and the live demo on the page shares its storage with the app.

- `brand/`: the logo, palette, type and how they're used ([BRAND.md](brand/BRAND.md))
- `copy/`: the words on the page and the launch post
- `site/`: the page itself, built with Vite+, React and Motion

```sh
cd site
pnpm install
vp dev
```

## Credits

The hero is directly inspired by the opening screen of [Buzz](https://buzz.xyz), Block's open-source app: one bold field color, an oversized grainy wordmark, a faint dot grid and little creatures that fly around and flee the cursor. The cursor-shy bees are Wes Billman's ([@wesbillman](https://github.com/wesbillman)), from Buzz's landing screen in [block/buzz#1982](https://github.com/block/buzz/pull/1982). seqno's version swaps the bees for outline bullets that settle into outlines. Everything else it borrows is listed in [brand/references.md](brand/references.md).
