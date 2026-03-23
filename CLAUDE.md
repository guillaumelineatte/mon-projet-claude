cat > CLAUDE.md << 'EOF'
# CLAUDE.md - Mon Projet de Test

## 🎯 Objectif du projet
Projet de test pour maîtriser Claude Code. Stack web moderne (React/Node).

## 🛠️ Stack technique
- **Frontend** : React 18 + TypeScript + Tailwind CSS + Vite
- **Backend** : Node.js + Express + Prisma (PostgreSQL)
- **Tests** : Vitest (unitaires) + Playwright (E2E)
- **Style** : Prettier + ESLint (Airbnb)
- **Commits** : Conventional Commits (feat:, fix:, chore:, etc.)

## 📏 Conventions code
- Fichiers : kebab-case (ex: `hello-world.tsx`)
- Composants : PascalCase
- Fonctions : camelCase
- Constantes : UPPER_SNAKE_CASE
- Fonctions < 30 lignes, extraire helpers si répétition
- 100% test coverage sur nouveaux features

## 🌿 Git Workflow
- Branches : `feat/nom-feature`, `fix/bug-123`, `hotfix/urgent`
- Commits : `:emoji: type(scope): description` (ex: `✨ feat(compteur): ajoute bouton +1`)
- PRs : toujours avec changelog + tests + screenshot si UI
- Jamais push direct sur `main`

## ✅ Checklist TÂCHE
Pour chaque feature/bug :
- [ ] Lis specs/ticket
- [ ] Crée branche Git
- [ ] Implémente code
- [ ] Ajoute tests (100% coverage)
- [ ] Met à jour doc/README
- [ ] Propose diff pour review
- [ ] Demande confirmation avant commit/push

## 🚫 INTERDIT
- Secrets en dur (API keys, .env)
- node_modules dans Git
- Push sans tests
- Code sans TypeScript

## 💡 Exemple commit parfait
