import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const SelectedAttrbutes = ({ attribute }) => (
  <div>
    {attribute.name}:{" "}
    {attribute.name === "Color" ? (
      <div
        style={{
          display: "inline-block",
          width: 10,
          height: 10,
          backgroundColor: attribute.item.value,
        }}
      ></div>
    ) : (
      attribute.item.value
    )}
  </div>
);

function ProductItem({
  product,
  hasAttr,
  currency,
  addItem,
  fromCart,
  updateItem,
}) {
  const [item, setItem] = useState(null);

  console.log(item);

  useEffect(() => {
    if (!fromCart) {
      setItem({
        id: product.id,
        gallery: product.gallery,
        brand: product.brand,
        category: product.category,
        description: product.description,
        name: product.name,
        quantity: 1,
        price: product.prices.find((p) => p.currency === currency),
        attributes: product.attributes?.map((attribute) => ({
          id: attribute.id,
          name: attribute.name,
          item: attribute.items[0],
        })),
      });
    } else {
      setItem(null);
    }
  }, [product, currency, fromCart]);

  const updateAttr = (attribute, attrName) => {
    if (fromCart) {
      updateItem({
        id: fromCart.id,
        update: {
          attributes: fromCart.attributes?.map((attr) => {
            if (attr.id === attrName) {
              return {
                ...attr,
                item: attribute,
              };
            } else {
              return attr;
            }
          }),
        },
      });
    } else {
      setItem((prevState) => ({
        ...prevState,
        attributes: prevState.attributes?.map((attr) => {
          if (attr.id === attrName) {
            return {
              ...attr,
              item: attribute,
            };
          } else {
            return attr;
          }
        }),
      }));
    }
  };

  return (
    <div className="card">
      {/* Selected or default selections */}
      <div style={{ margin: 10, fontSize: 13 }}>
        {fromCart?.attributes?.map((attribute) => (
          <SelectedAttrbutes attribute={attribute} key={attribute.name} />
        )) ||
          item?.attributes?.map((attribute) => (
            <SelectedAttrbutes attribute={attribute} key={attribute.name} />
          ))}
      </div>
      <Link to={`/${product.category}/${product.id}`} className="card">
        <div
          className="card__image"
          style={{
            backgroundImage: `url("${product.gallery[0]}")`,
          }}
          alt=""
        ></div>
      </Link>
      <div className="card__content">
        <p className="card__title">{product.name}</p>

        <div className="card__options">
          {hasAttr(product, "Color") &&
            product.attributes
              .find((attr) => attr.id === "Color")
              .items.map((attr) => (
                <div
                  className="box"
                  onClick={() => updateAttr(attr, "Color")}
                  key={attr.value}
                  style={{
                    backgroundColor: attr.value,
                    cursor: "pointer",
                  }}
                ></div>
              ))}
        </div>
        <div className="card__options">
          {hasAttr(product, "Capacity") &&
            product.attributes
              .find((attr) => attr.id === "Capacity")
              .items.map((attr) => (
                <div
                  className="box"
                  key={attr.value}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateAttr(attr, "Capacity")}
                >
                  {attr.value}{" "}
                </div>
              ))}
        </div>

        <div className="card__options">
          {hasAttr(product, "Size") &&
            product.attributes
              .find((attr) => attr.id === "Size")
              .items.map((attr) => (
                <div
                  className="box"
                  key={attr.value}
                  style={{ cursor: "pointer" }}
                  onClick={() => updateAttr(attr, "Size")}
                >
                  {" "}
                  {attr.value}{" "}
                </div>
              ))}
        </div>

        <h3 className="card__price">
          {currency}{" "}
          {product.prices.find((price) => price.currency === currency).amount}
        </h3>
        {!fromCart ? (
          <div
            className="add-to-cart"
            onClick={() => {
              addItem(item);
              setItem(null);
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductItem;
