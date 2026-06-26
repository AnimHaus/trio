import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { characters } from '@/lib/characters'
import CharacterDetailClient from './CharacterDetailClient'

interface Props {
  params: Promise<{ character: string }>
}

export function generateStaticParams() {
  return characters.map((c) => ({ character: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { character: id } = await params
  const char = characters.find((c) => c.id === id)
  if (!char) return {}
  return {
    title: `${char.name} — ${char.role}`,
    description: char.bio,
  }
}

export default async function CharacterPage({ params }: Props) {
  const { character: id } = await params
  const char = characters.find((c) => c.id === id)
  if (!char) notFound()
  return <CharacterDetailClient character={char} />
}
