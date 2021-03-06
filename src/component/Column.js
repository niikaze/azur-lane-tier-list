import React, { Fragment } from "react";
import TierRows from "./TierRows";
// redux
import { connect } from "react-redux";
import { shipsFetchData } from "./redux/actions/ships";
import showFilteredShips from "./redux/selectors/ships";
import { setVisibleColumn } from "./redux/actions/column";
import { CSSTransitionGroup } from "react-transition-group";
import ShipModal from "./ShipModal";

class Column extends React.Component {
  componentDidMount() {
    this.props.dispatch(shipsFetchData("/api/ships"));
  }

  render() {
    const filterByPosition = this.props.ships.filter(ship => ship.position === this.props.position);
    return (
      <section className="column">
        {/* <ShipModal /> */}
        <CSSTransitionGroup
          transitionName="columnFilter"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          component={Fragment}
        >

          {this.props.ships.length < 1 ?
            null :
            <div>
              <div className="column__title-container">
                <h2 className="column__title">{this.props.position}</h2>
                <button
                  onClick={() => this.props.dispatch(setVisibleColumn())}
                  className={"content__btn-switcher"}
                >
                  Show {this.props.column.isFrontVisible ? "Backline" : "Frontline"}
                </button>
              </div>
              <TierRows filteredData={filterByPosition} />
            </div>
          }
        </CSSTransitionGroup>
      </section>
    )
  }
}

const mapStateToprops = (state) => {
  return {
    ships: showFilteredShips(state.ships, state.filters),
    column: state.column
  }
}

export default connect(mapStateToprops)(Column);