import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../graphql/queries";
import { SelectedAttrbutes } from "../components/collection-item/ProductItem";

import { addItem, updateItem } from "../redux/cart/cart.actions";
import { selectCurrency } from "../redux/currencies/currency.selectors";
import { selectCartItems } from "../redux/cart/cart.selectors";

import "./productdetail.styles.scss";
import { connect } from "react-redux";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      currency: props.currency,
    };
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    if (
      (!prevState.item &&
        prevProps.data.product &&
        !prevProps.cartItems.find(
          (item) => item.id === prevProps.data.product.id,
        )) ||
      prevProps.currency !== prevState.currency
    ) {
      return {
        item: {
          id: prevProps.data.product.id,
          gallery: prevProps.data.product.gallery,
          brand: prevProps.data.product.brand,
          category: prevProps.data.product.category,
          description: prevProps.data.product.description,
          name: prevProps.data.product.name,
          quantity: 1,
          price: prevProps.data.product.prices.find(
            (p) => p.currency === prevProps.currency,
          ),
          attributes: prevProps.data.product.attributes?.map((attribute) => ({
            id: attribute.id,
            name: attribute.name,
            item: attribute.items[0],
          })),
        },
        currency: prevProps.currency,
      };
    }

    if (
      prevProps.data.product &&
      prevProps.cartItems.find((item) => item.id === prevProps.data.product.id)
    ) {
      return {
        item: null,
        currency: prevProps.currency,
      };
    }
    return null;
  }

  //   componentDidUpdate(prevProps) {
  //     console.log(this.state);
  //   }

  updateAttr(attribute, attrName) {
    const fromCart = this.props.cartItems.find(
      (item) => item.id === this.props.data.product?.id,
    );
    if (fromCart) {
      this.props.updateItem({
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
      this.setState((prevState) => ({
        ...prevState,
        item: {
          ...prevState.item,
          attributes: prevState.item.attributes?.map((attr) => {
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
      }));
    }
  }

  render() {
    const {
      currency,
      addItem,
      cartItems,
      data: { product },
    } = this.props;

    const fromCart = cartItems.find((item) => item.id === product?.id);

    const hasAttr = (attrId) =>
      product?.attributes?.some((attr) => attr.id === attrId);

    return (
      <div className="product-page">
        <div className="product-page__gallery">
          <img src={this.props.data?.product?.gallery[1]} alt="" />
          <img src={this.props.data?.product?.gallery[2]} alt="" />
          <img src={this.props.data?.product?.gallery[3]} alt="" />
        </div>
        <div className="product-page__main-image">
          <img src={this.props.data?.product?.gallery[0]} alt="" />
        </div>
        <div className="product-page__details">
          {/* Selected or default selections */}
          <div style={{ marginBottom: 10, fontSize: 13 }}>
            {fromCart?.attributes?.map((attribute) => (
              <SelectedAttrbutes attribute={attribute} key={attribute.name} />
            )) ||
              this.state.item?.attributes?.map((attribute) => (
                <SelectedAttrbutes attribute={attribute} key={attribute.name} />
              ))}
          </div>

          <h2 className="name">{this.props.data?.product?.name}</h2>
          <p className="brand">{this.props.data?.product?.brand}</p>
          <div className="size">
            <div className="size__options">
              {hasAttr("Size") &&
                this.props.data?.product?.attributes
                  .find((attr) => attr.id === "Size")
                  .items.map((attr) => (
                    <div
                      className="box"
                      key={attr.value}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.updateAttr(attr, "Size")}
                    >
                      {attr.value}
                    </div>
                  ))}
            </div>
            <div className="size__options">
              {hasAttr("Color") &&
                this.props.data?.product?.attributes
                  .find((attr) => attr.id === "Color")
                  .items.map((attr) => (
                    <div
                      className="box"
                      onClick={() => this.updateAttr(attr, "Color")}
                      key={attr.value}
                      style={{ backgroundColor: attr.value, cursor: "pointer" }}
                    ></div>
                  ))}
            </div>
            <div className="size__options">
              {hasAttr("Capacity") &&
                this.props.data?.product?.attributes
                  .find((attr) => attr.id === "Capacity")
                  .items.map((attr) => (
                    <div
                      className="box"
                      key={attr.value}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.updateAttr(attr, "Capacity")}
                    >
                      {attr.value}
                    </div>
                  ))}
            </div>
          </div>
          <div className="price">
            <p>price:</p>
            <h3>
              {currency}{" "}
              {
                this.props.data?.product?.prices.find(
                  (price) => price.currency === currency,
                ).amount
              }
            </h3>
          </div>
          {!fromCart ? (
            <div className="add-to-cart">
              {this.props.data?.product && (
                <button
                  onClick={() => {
                    addItem(this.state.item);
                    this.setState({
                      ...this.state,
                      item: null,
                    });
                  }}
                >
                  add to cart
                </button>
              )}
            </div>
          ) : null}

          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: this.props.data?.product?.description,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  updateItem: (item) => dispatch(updateItem(item)),
});

const graph = graphql(getProduct, {
  options: (props) => ({
    variables: { id: props.match.params.id },
  }),
})(ProductDetailPage);

export default connect(mapStateToProps, mapDispatchToProps)(graph);
