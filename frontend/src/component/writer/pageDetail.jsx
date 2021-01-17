import React, { Component } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
class PageDetail extends Component {
	render() {
		const { titleValue, setTitle, value, setValue, doSave, moveBack } = this.props;
		return (
			<div className="pageDetailContainer">
				<Input type="text" autoFocus value={titleValue} onChange={setTitle} defaultValue="Title" />
				<MDEditor value={value} height={'400px'} onChange={setValue} />
				<div className="buttons">
					<Button variant="outlined" color="secondary" size="large" onClick={moveBack}>
						Back
					</Button>
					<div className="space" />
					<Button
						variant="contained"
						color="primary"
						size="large"
						// onClick={doSave}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</div>
			</div>
		);
	}
}

export default PageDetail;
