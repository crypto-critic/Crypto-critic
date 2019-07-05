import React, { PropsTypes } from "react";
import {Link} from "react-router-dom";
import 'styling/semantic.less';
import { Grid, Divider} from 'semantic-ui-react';
import './app-layout.css';

const AppLayoutForm = ({children, advertising, statusbar, selectbase, menubar, search, footer})=>
      (
        <div>
          <Grid>
            <Grid.Row centered column={1} vertical>
              <Grid.Column textAlign='center'>
                {advertising}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered column={2}>
              <Grid.Column textAlign='left' width={10}>
                {statusbar}
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                {selectbase}    
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row centered column={2}>
              <Grid.Column textAlign='left' width={10}  >
                {menubar}
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                {search}
              </Grid.Column>
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row centered column={3}>
              <Grid.Column textAlign='center' width={1}>
                {/* this is offset */}
              </Grid.Column>
              <Grid.Column textAlign='center' width={13}>
                {children}
              </Grid.Column>
              <Grid.Column textAlign='center' width={1}>
                {/* this is offset */}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered column={1} vertical>
              <Grid.Column textAlign='center'>
                {footer}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
export default AppLayoutForm;
