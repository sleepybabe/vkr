import React from 'react';
import http from '../http-common';

import {
  Box, Collapse, Typography, Button, TextField,
  Table, TableHead, TableBody, TableCell, TableRow,
  Paper, IconButton, TableContainer
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

class CriteriaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: [],
      filteredCriteria: [],
      searchQuery: '',
      showAddForm: false,
      currentCriterion: null,
      newCriterionName: '',
      newCriterionDescription: '',
      newCriterionCode: '',
      newCriterionComment: '',
    };

    this.fetchCriteria = this.fetchCriteria.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleOpenUpdate = this.handleOpenUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchCriteria();
  };

  fetchCriteria() {
    http.get('/api/getCriteria')
      .then(response => {
        this.setState({
          criteria: response.data,
          filteredCriteria: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleAdd() {
    this.setState({
      showAddForm: true,
      currentCriterion: null,
      newCriterionName: '',
      newCriterionDescription: '',
      newCriterionCode: '',
      newCriterionComment: '',
    });
  };

  handleOpenUpdate = (criterion) => {
    this.setState({
        currentCriterion: criterion,
        showAddForm: true,
        newCriterionName: criterion.name,
        newCriterionDescription: criterion.description,
        newCriterionCode: criterion.code,
        newCriterionComment: criterion.comment,
    });

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  };
  
  handleDelete = (criterionId) => {
    http
      .post(`/api/deleteCriterion/${criterionId}`)
      .then(() => {
        this.setState((prevState) => ({
          criteria: prevState.criteria.filter(criterion => criterion.id !== criterionId),
          filteredCriteria: prevState.filteredCriteria.filter(criterion => criterion.id !== criterionId)
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleFormSubmit = () => {
    const {currentCriterion, newCriterionName, newCriterionDescription,
        newCriterionCode, newCriterionComment } = this.state;
  
    const criterionData = {
      name: newCriterionName,
      description: newCriterionDescription,
      code: newCriterionCode,
      comment: newCriterionComment,
    };
  
    if (currentCriterion) {
      http
        .post(`/api/updateCriterion/${currentCriterion.id}`, criterionData)
        .then(() => {
          this.setState((prevState) => {
            const updatedCriteria = prevState.criteria.map((criterion) =>
              criterion.id === currentCriterion.id ? { ...criterion, ...criterionData } : criterion
            );
            return {
              criteria: updatedCriteria,
              filteredCriteria: updatedCriteria,
              showAddForm: false,
              currentCriterion: null,
              newCriterionName: '',
              newCriterionDescription: '',
              newCriterionCode: '',
              newCriterionComment: '',
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      http
        .post('/api/addCriterion', criterionData)
        .then(response => {
          const newCriterion = response.data;
          this.setState((prevState) => ({
            criteria: [...prevState.criteria, newCriterion],
            filteredCriteria: [...prevState.filteredCriteria, newCriterion],
            showAddForm: false,
            currentCriterion: null,
            newCriterionName: '',
            newCriterionDescription: '',
            newCriterionCode: '',
            newCriterionComment: '',
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearchChange(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });

    const { criteria } = this.state;
    const filteredCriteria = criteria.filter(criterion =>
      criterion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      criterion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      criterion.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      criterion.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ filteredCriteria });
  };

  render() {
    const { searchQuery, showAddForm, newCriterionName, newCriterionDescription,
            newCriterionCode, newCriterionComment, filteredCriteria } = this.state;

    return (
      <Box sx={{ m: 2 }}>
        <TextField
          label="Поиск критериев"
          value={searchQuery}
          onChange={this.handleSearchChange}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={this.handleAdd}>
          Добавить критерий
        </Button>

        <Collapse in={showAddForm}>
          <Box sx={{ margin: '10px 0' }}>
            <Typography variant="h6">
              {this.state.currentCriterion ? 'Обновить критерий' : 'Добавить критерий'}
            </Typography>
            <TextField
              label="Название"
              name="newCriterionName"
              value={newCriterionName}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Описание"
              name="newCriterionDescription"
              value={newCriterionDescription}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Код"
              name="newCriterionCode"
              value={newCriterionCode}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Комментарий"
              name="newCriterionComment"
              value={newCriterionComment}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
              Сохранить
            </Button>
          </Box>
        </Collapse>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead  
              sx={{ bgcolor: '#d4e3fc', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}
            >
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Код</TableCell>
                <TableCell>Комментарий</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCriteria.map((criterion) => (
                <TableRow key={criterion.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f7ff' } }}>
                  <TableCell>{criterion.name}</TableCell>
                  <TableCell>{criterion.description}</TableCell>
                  <TableCell>{criterion.code}</TableCell>
                  <TableCell>{criterion.comment}</TableCell>
                <TableCell>
                  <IconButton onClick={() => this.handleOpenUpdate(criterion)}>
                    <EditOutlinedIcon sx={{ fontSize: 'xx-large' }} />
                  </IconButton>
                  <IconButton onClick={() => this.handleDelete(criterion.id)}>
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: 'xx-large' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default CriteriaList;
