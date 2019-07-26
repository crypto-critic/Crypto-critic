import React, {Component} from 'react';

export default class HeaderRenderer extends Component {
    constructor(props) {
        super(props);

        props.reactContainer.style.display = "inline-block";

        this.state = {
            sort: 'no_sort'
        };

        // props.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
    }

    // componentDidMount() {
    //     this.onSortChanged();
    // }

    render() {
        console.log(this.state.sort)
        let menu = null;
        if (this.props.enableMenu) {
            menu =
                <div ref={(menuButton) => { this.menuButton = menuButton; }}
                    className="customHeaderMenuButton"
                    onClick={this.onMenuClicked.bind(this)}>
                    <i className={`fa ${this.props.menuIcon}`}></i>
                </div>;
        }

        let sort = null;
        if (this.props.enableSorting) {
            sort =
                <div style={{display: "inline-block"}} onClick={() => this.onSortRequested()}>
                    {
                        this.state.sort = 'no_sort' ? <i className="fas fa-sort" />
                        : ( this.state.sort = 'asc' ? <i className="fas fa-heart" />
                        : <i className="fas fa-sort-down" />)
                    }
                </div>;
        }

        return (
            <span style={{display: 'inline-block'}}>
                {menu}
                <div className="customHeaderLabel">{this.props.displayName}</div>
                {sort}
            </span>
        );
    }

    onMenuClicked() {
        this.props.showColumnMenu(this.menuButton);
    }

    // onSortChanged() {
    //     this.setState({
    //         sort: this.props.column.isSortAscending() ? 'asc'
    //         : (this.props.column.isSortDescending() ? 'desc' : 'no_sort')
    //     });
    // }

    onMenuClick() {
        this.props.showColumnMenu(this.menuButton);
    }

    onSortRequested() {
        if (this.state.sort = 'no_sort') {
            this.props.setSort('asc');
            this.setState({sort: 'asc'})
        }
        if (this.state.sort = 'asc') {
            this.props.setSort('desc');
            this.setState({sort: 'desc'})
        }
        if (this.state.sort = 'desc') {
            this.props.setSort('asc');
            this.setState({sort: 'asc'})
        }
    }
}