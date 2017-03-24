import React, { Component, PropTypes } from 'react';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';

class Pane extends Component {
    constructor(...args) {
        super(...args);

        this.state = { size: this.props.size };
    }

    render() {
        const split = this.props.split;
        const classes = ['Pane', split, this.props.className];

        const style = Object.assign({}, this.props.style || {}, {});

        const { width, height } = this.props;

        style.width = width;
        style.height = height;

        return (
            <div className={classes.join(' ')} style={this.props.prefixer.prefix(style)}>
                {React.cloneElement(
                    React.Children.only(this.props.children),
                    { width, height },
                )}
            </div>
        );
    }
}

Pane.propTypes = {
    split: PropTypes.oneOf(['vertical', 'horizontal']),
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    prefixer: PropTypes.instanceOf(Prefixer).isRequired,
    style: stylePropType,
    size: PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
};

Pane.defaultProps = {
    prefixer: new Prefixer({ userAgent: USER_AGENT }),
};

export default Pane;
