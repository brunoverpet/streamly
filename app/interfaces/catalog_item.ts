export interface CatalogsItem {
  id: string
  page: number
  results: [
    {
      backdrop_path: string
      id: string
      title: string
    },
  ]
  title?: string
  coverUrl?: string
  director?: string
  genres?: Genre[]
  keywords?: Keyword[]
  actors?: Actor[]
}

export type Keyword = {
  id: number
  name: string
}

export type Genre = {
  id: number
  name: string
}

export type Actor = {
  id: number
  name: string
  profil_path: string
}

export type ProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type Cast = {
  id: number
  name: string
  known_for_department: string
  profile_path: string
}

type Crew = {
  id: number
  name: string
  job: string
}

export interface SingleItemFromTMDB {
  id: string
  genres: Genre[]
  backdrop_path: string
  production_companies: ProductionCompanies[]
  release_date: string
  title: string
  overview: string
  runtime: string
  vote_average: number
  keywords: { keywords: Keyword[] }
  credits: { cast: Cast[]; crew: Crew[] }
}

export interface SearchItem {
  page: number
  results: SingleItemFromTMDB[]
}
