import useProducts from '../../util/useProducts';
import Card from '../../components/Card/Card';
import styles from './Shop.module.css';

export default function Shop() {
  const { products, error, loading } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.shopContainer}>
      <h1>Shop our great selection of products below!</h1>
      <p>(Max of 10 per item)</p>
      <div className={styles.cardContainer}>
        {products?.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            url={product.image}
          />
        ))}
      </div>
    </div>
  );
}
