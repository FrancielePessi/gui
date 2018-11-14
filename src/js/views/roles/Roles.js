import React, { Component } from 'react';
import AltContainer from 'alt-container';
import RoleStore from '../../stores/RoleStore';
import RoleActions from '../../actions/RoleActions';
import { NewPageHeader } from '../../containers/full/PageHeader';
import { DojotBtnLink } from '../../components/DojotButton';


function RoleCard(obj) {
    return (
        <div className="card-size card-hover lst-entry-wrapper z-depth-2 fullHeight">
            <div className="lst-entry-title col s12">
                <img className="title-icon" src="images/roles-icon.png" alt="Role" />
                <div className="title-text truncate" title={obj.group.name}>
                    <span className="text">
                        {obj.group.name}
                    </span>
                </div>
            </div>
            <div className="attr-list">
                <div className="attr-area light-background">
                    <div className="attr-row">
                        <div className="icon">
                            <img src="images/info-icon.png" alt="Description" />
                        </div>
                        <div className="user-card attr-content" title={obj.group.description}>
               {/*              <input  type="text" value={obj.group.description} disabled /> */}
                            {obj.group.description}
                            <span>Description</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

function RolesList(param) {
    if (param.groups) {
        return (
            <div className="fill">
                {param.groups.map(obj => <RoleCard group={obj} key={obj.id} />)}
            </div>);
    }
}


function OperationsHeader(param) {
    return (
        <div className="col s12 pull-right pt10">
            <DojotBtnLink
                responsive="true"
                onClick={param.newGroup}
                label="New Role"
                alt="Create a new role"
                icon="fa fa-plus"
                className="w130px"
            />
        </div>

    );
}

class Roles extends Component {
    constructor(props) {
        super(props);
        this.newGroup = this.newGroup.bind(this);
        this.state = {};
    }

    componentDidMount() {
        RoleActions.fetchGroups.defer();
    }

    componentWillUnmount() {

    }

    newGroup() {
    }

    componentDidCatch(error, info) {
        console.log('componentDidCatch 1', error);
        console.log('componentDidCatch 2', info);
    }

    render() {
        return (
            <div id="roles-wrapper">
                <AltContainer store={RoleStore}>
                    <NewPageHeader title="Roles" subtitle="xxxx" icon="roles">
                        <OperationsHeader newGroup={this.newGroup} />
                    </NewPageHeader>
                    <RolesList />
                </AltContainer>
            </div>
        );
    }
}


export default Roles;
