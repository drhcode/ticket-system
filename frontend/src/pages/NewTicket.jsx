import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {};

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="product">Product</label>
          <select
            name="product"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="Iphone">Iphone</option>
            <option value="Samsung">Samsung</option>
            <option value="Laptop">Laptop</option>
            <option value="Mac">Mac</option>
          </select>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
