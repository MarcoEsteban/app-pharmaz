import { Card, Search, Title } from '@/components';
import { ItemCard } from '@/components/lotes';

export default function LotesPage() {
  return (
    <>
      <Card>
        <Title title={ 'Lotes' } />

        <Search placeholder={ 'Buscar Lote' } />
      </Card>
      <div className={ 'grid grid-cols-3 gap-4 pt-4' }>
        {
          ( [ ...Array( 8 ) ].map( ( _, index ) => (
            <ItemCard key={index} />
          ) ) )
        }
      </div>
    </>
  );
}
