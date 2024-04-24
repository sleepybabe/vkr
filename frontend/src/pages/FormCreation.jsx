import React from 'react';
import http from "../http-common";

import { 
  OutlinedInput, InputLabel, MenuItem,
  FormControl, ListItemText, Select,
  Checkbox, Button, Accordion, Box,
  AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, Paper,
  TableContainer, TableHead, Collapse,
  TableRow, IconButton, Input,
  Typography
  } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      overflowY: 'auto',
      width: 250
    },
  },
};

const modules = ['HTML', 'CSS', 'JS']

class FormCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labs: [],
      selectedLabs: [],
      selectedCriteria: [],
      lab: {
        name: '',
        domic_lab_id: '',
        module: ''
      },
      selectAll: false,
      selectAllCriteria: false,
      labsByModule: {},
      expanded: false,
      criteriaForLab: {},
      expandedAddition: false,
      expandedUpdate: false,
      invalidMessage: '',
      invalidUpdateInput: '',
      availableCriteria: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelectCriteria = this.handleChangeSelectCriteria.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitLab = this.handleSubmitLab.bind(this);
    this.handleSubmitCriteria = this.handleSubmitCriteria.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickOpenUpdate = this.handleClickOpenUpdate.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickOpenPopup = this.handleClickOpenPopup.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeInputForCriteria = this.handleChangeInputForCriteria.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  componentDidMount() {
    http
      .get("/api/getLabs")
      .then(response => {
        const labs = response.data;
        const labsByModule = labs.reduce((accumulator, lab) => {
          if (!accumulator[lab.module]) {
            accumulator[lab.module] = [];
          }
          accumulator[lab.module].push(lab);
          return accumulator;
        }, {});
  
        const sortedLabsByModule = {
          HTML: labsByModule['HTML'] || [],
          CSS: labsByModule['CSS'] || [],
          JS: labsByModule['JS'] || []
        };
  
        this.setState({
          labsByModule: sortedLabsByModule,
          labs: labs
        });
      })
      .catch(error => {
        console.error(error);
      });

      http
        .get('/api/getCriteria')
        .then(response => {
          this.setState({ availableCriteria: response.data});
        })
        .catch(error => {
          console.error(error);
        });
  }

  handleChange(event) {
    const value = event.target.value;
    const { labs } = this.state;
    if (value.includes('select-all')) {
        const allLabsIds = labs.map(lab => `${lab.domic_lab_id}, ${lab.module}`);
        this.setState(prevState => ({
            selectedLabs: prevState.selectAll ? [] : allLabsIds,
            selectAll: !prevState.selectAll,
        }));
    } else {
        this.setState({
            selectedLabs: value,
            selectAll: false,
        });
    }
  }

  handleChangeSelectCriteria(event) {
    const value = event.target.value;
    
    if (value.includes("select-all-criteria")) {
        const { availableCriteria, selectAllCriteria } = this.state;
        const allCriteriaIds = availableCriteria.map(criterion => criterion.id);
        this.setState({
            selectedCriteria: selectAllCriteria ? [] : allCriteriaIds,
            selectAllCriteria: !selectAllCriteria,
        });
    } else {
        this.setState({
            selectedCriteria: value,
            selectAllCriteria: false, 
        });
    }
  };

  handleChangeAccordion = (panel, lab_id) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false, invalidUpdateInput: false});
    if (this.state.expandedAddition || this.state.expandedUpdate) {
      this.setState({
        expandedAddition: false,
        invalidMessage: false,
        expandedUpdate: false
      });
    }
    if (isExpanded && !this.state.criteriaForLab[lab_id]) {
      http
        .get(`/api/getCriteriaForLab/${lab_id}`)
        .then(response => {
          const criteria = response.data;
          var criteriaIds = [];
          criteria.forEach((criterion) => {
            criteriaIds.push(criterion.criterion_id);
          });
          this.setState(prevState => ({
            criteriaForLab: {
              ...prevState.criteriaForLab,
              [lab_id]: criteria
            },
            selectedCriteria: criteriaIds
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  handleChangeInput = (event, field) => {
    if (this.state.invalidMessage)
      this.setState({ invalidMessage: false })
    var { value } = event.target;

    if (field === 'domic_lab_id'){
      value = parseFloat(value);

      if (isNaN(value)) {
          value = '';
      }
    }

    this.setState(prevState => ({
      lab: {
        ...prevState.lab,
        [field]: value
      }
    }));
  }

  handleChangeInputForCriteria = (event, field, criterionId, lab) => {
    this.setState({
      invalidUpdateInput: false
    });
    var { value } = event.target;

    value = parseFloat(value);

    if (isNaN(value)) {
        value = '';
    }

    this.setState(prevState => {
        const updatedCriteria = prevState.criteriaForLab[lab.id].map(criterion => {
            if (criterion.id === criterionId) {
                return {
                    ...criterion,
                    [field]: value
                };
            }
            return criterion;
        });
        return {
            criteriaForLab: {
                ...prevState.criteriaForLab,
                [lab.id]: updatedCriteria
            }
        };
    });
  };

  handleClickDelete = (lab_id) => (event) => {
    event.stopPropagation();
  
    http
      .post(`/api/deleteLab/${lab_id}`)
      .then(() => {
        const updatedLabs = this.state.labs.filter(lab => lab.id !== lab_id);
        const updatedLabsByModule = { ...this.state.labsByModule };
        Object.keys(updatedLabsByModule).forEach(module => {
          updatedLabsByModule[module] = updatedLabsByModule[module].filter(lab => lab.id !== lab_id);
        });
        
        this.setState({ 
          labsByModule: updatedLabsByModule,
          labs: updatedLabs
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClickOpenUpdate = (lab_id, module, name, domic_lab_id) => (event) => {
    event.stopPropagation();
    
    this.setState(prevState => ({
      expanded: false,
      expandedAddition: false,
      lab: {...prevState.lab,
        name: name,
        module: module,
        domic_lab_id: domic_lab_id
      },
      invalidMessage: false,
      invalidUpdateInput: false
    }));

    if (!this.state.expandedUpdate || this.state.expandedUpdate !== lab_id){
      this.setState({ 
        expandedUpdate: lab_id
      });
    }
    else {
      this.setState({
        expandedUpdate: false
      });
    }
  }
  
  handleClickAdd = (module) => (event) => {
    if (this.state.lab.domic_lab_id && this.state.lab.name) {
      const labsInModule = this.state.labsByModule[module] || [];
      const existLab = labsInModule.find(lab => lab.domic_lab_id === this.state.lab.domic_lab_id);
      if (existLab) {
        this.setState({
          invalidMessage: 'Лабораторная работа с таким Domic ID уже существует.'
        });
        return;
      }
      http
        .post(`/api/addLab`, this.state.lab)
        .then(response => {
          const newLab = response.data;
          const updatedLabsByModule = { ...this.state.labsByModule };
          const newLabList = updatedLabsByModule[module] ? [...updatedLabsByModule[module]] : [];
          const insertIndex = newLabList.findIndex(lab => lab.domic_lab_id > newLab.domic_lab_id);
          if (insertIndex === -1) {
            newLabList.push(newLab);
          } else {
            newLabList.splice(insertIndex, 0, newLab);
          }
          updatedLabsByModule[module] = newLabList;
          const updatedLabs = [...this.state.labs];
          updatedLabs.push(newLab);
          updatedLabs.sort((a, b) => a.domic_lab_id - b.domic_lab_id);

          this.setState({ 
            labsByModule: updatedLabsByModule,
            labs: updatedLabs });
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        this.setState({ 
          invalidMessage: 'Пожалуйста, введите корректные данные для лабораторной работы.'
        });
      }
  }

  handleClickOpenPopup= (module) => (event) => {
    this.setState(() => ({
      lab: { 
        module: module,
        name: "",
        domic_lab_id: ""
      },
      invalidMessage: false,
      expandedUpdate: false,
      invalidUpdateInput: false
    }));
    if (!this.state.expandedAddition || this.state.expandedAddition !== module){
      this.setState({
        expandedAddition: module
      });
    }
    else {
      this.setState({
        expandedAddition: false
      });
    }
  }

  handleClickUpdate = (lab_id) => (event) => {
    const module = this.state.lab.module;
    const moduleLabs = this.state.labsByModule[module];
    const uniqueDomicId = !moduleLabs.some(lab => lab.domic_lab_id === this.state.lab.domic_lab_id && lab.id !== lab_id);

    if (!uniqueDomicId) {
      this.setState({
        invalidMessage: 'Лабораторная работа с таким Domic ID уже существует.'
      });
      return;
    }

    if (this.state.lab.domic_lab_id && this.state.lab.name) {
      http
        .post(`/api/updateLab/${lab_id}`, this.state.lab)
        .then(response => {
          const updatedLab = {
            ...this.state.lab,
            id: lab_id
          };
          const updatedLabs = this.state.labs.map(lab => {
            if (lab.id === lab_id) {
              return updatedLab;
            }
            return lab;
          });

          updatedLabs.sort((a, b) => a.domic_lab_id - b.domic_lab_id);

          const updatedLabsByModule = { ...this.state.labsByModule };
          Object.keys(updatedLabsByModule).forEach(module => {
            updatedLabsByModule[module] = updatedLabsByModule[module].map(lab => {
              if (lab.id === lab_id) {
                if (updatedLab.module !== module) {
                  updatedLabsByModule[updatedLab.module].push(updatedLab);
                  updatedLabsByModule[updatedLab.module].sort((a, b) => a.domic_lab_id - b.domic_lab_id);
                  return null;
                }
                return updatedLab;
              }
              return lab;
            }).filter(Boolean);
            updatedLabsByModule[module].sort((a, b) => a.domic_lab_id - b.domic_lab_id);
          });

          this.setState({ 
            labsByModule: updatedLabsByModule,
            labs: updatedLabs,
            expandedUpdate: false
          });
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        this.setState({ 
          invalidMessage: 'Пожалуйста, введите корректные данные для лабораторной работы.'
        });
      }
  }
  
  handleSubmit(event) {
    event.preventDefault();

    http
      .post(`/api/download`, { selectedLabs: this.state.selectedLabs }, { responseType: 'blob' })
      .then(response => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(response.data);
        link.download = 'extension.zip';
        document.body.appendChild(link).click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmitCriteria = (lab_id) => (event) => {
    event.preventDefault();

    http
        .post(`/api/addLabCriteria/${lab_id}`, { selectedCriteria: this.state.selectedCriteria })
        .then(response => {
            return http.get(`/api/getCriteriaForLab/${lab_id}`);
        })
        .then(response => {
            this.setState(prevState => ({
                criteriaForLab: {
                    ...prevState.criteriaForLab,
                    [lab_id]: response.data
                }
            }));
        })
        .catch(error => {
            console.error(error);
        });
  };

  handleSubmitLab = (lab_id) => (event) => {
    event.preventDefault();
    const criteriaData = this.state.criteriaForLab[lab_id];
    if (criteriaData.length === 0) {
      this.setState({
        invalidUpdateInput: `Критерии не найдены.`
      });
      return;
    }

    let procentSum = 0;

    for (const criterion of criteriaData) {
        if (criterion.procent <= 0) {
          this.setState({
            invalidUpdateInput: `Процент для ${criterion.name} -
             не положительное число. Обновление не было выполнено`
          });
          return;
        }
        procentSum += criterion.procent;
    }

    if (procentSum !== 100) {
        this.setState({
          invalidUpdateInput: `Общий процент за выполнение не равен 100
           (текущий процент: ${procentSum}). Обновление не было выполнено.`
        });
        return;
    }

    const updatePromises = criteriaData.map(criterion => {
        const { id, index_number, procent } = criterion;
        return http.post(`/api/updateLabCriterion/${id}`, { index_number, procent })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(`Error updating criterion ${id}:`, error);
            });
    });

    Promise.all(updatePromises)
        .then(responses => {
            criteriaData.sort((a, b) => a.index_number - b.index_number);
            this.setState(prevState => ({
                criteriaForLab: {
                    ...prevState.criteriaForLab,
                    [lab_id]: criteriaData
                }
            }));
        })
        .catch(error => {
            console.error(error);
        });
  };

  render() {
    const { selectedLabs, labs, selectAll,labsByModule, availableCriteria, selectAllCriteria,
           expanded, criteriaForLab, expandedAddition, expandedUpdate, selectedCriteria} = this.state;
    return (
      <Box key='original'>
        <Box key='select-box' sx={{ display: 'flex',  flexDirection: 'raw', m: 3}}>
          <FormControl sx={{ width: 600, flexDirection: 'inherit'}} >
            <InputLabel id="multiple-select-alllabs-label">Лабораторные работы</InputLabel>
            <Select
              labelId="multiple-select-alllabs-label"
              id="multiple-select-alllabs"
              multiple
              value={selectedLabs}
              onChange={this.handleChange}
              input={<OutlinedInput label="Лабораторные работы" />}
              renderValue={(select) => ''}
              MenuProps={MenuProps}
              sx={{ width: 300, height: 50 }}
            >
              <MenuItem key="select-all" value='select-all'>
                <Checkbox
                  checked={selectAll}
                  indeterminate={selectedLabs.length > 0 && selectedLabs.length < labs.length}
                />
                <ListItemText primary={'Выбрать все'} />
              </MenuItem>

              {modules.map(module => ([
                <MenuItem key={module} disabled>
                  <ListItemText primary={module} />
                </MenuItem>,
                ...labs.filter(lab => lab.module === module).map((lab) => (
                  <MenuItem key={lab.id} value={`${lab.domic_lab_id}, ${lab.module}`}>
                    <Checkbox checked={selectedLabs.includes(`${lab.domic_lab_id}, ${lab.module}`)} />
                    <ListItemText primary={lab.name} />
                  </MenuItem>
                ))
              ]))}
            </Select>
            <Button
              sx={{ backgroundColor: '#5f8ce7', ml: 1, fontWeight: '700',
                  ":disabled": { backgroundColor: '#eaf1ff' } }}
              type='submit'
              variant='contained'
              color='primary'
              disabled={this.state.selectedLabs.length === 0}
              onClick={this.handleSubmit}
            >
              Сгенерировать
            </Button>
          </FormControl>
        </Box>
        
        <Box key={'box-modules'} sx={{ display: 'flex', ml: 3, mr: 2 }}>
          {Object.keys(labsByModule).map((module, index) => (
            <Box key={`${module}_${index}`} sx={{ 
              flex: '0 1 calc(33.33% - 10px)',
              mr: 1}}
            >
              <Box key={`${module}_${index}_${index}`} sx={{
                pt: 1, pb: 1, mb: '3px',
                backgroundColor: '#dae7ff',
                borderRadius: '5px',
                boxShadow: '0 3px 4px rgba(0, 0, 0, 0.3)',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', width: '100%'}}
              >
                <Typography sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>{module}</Typography>
                <IconButton onClick={this.handleClickOpenPopup(module)}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
              <Collapse in={expandedAddition === module} timeout="auto" unmountOnExit
                sx={{ mb: '3px', borderRadius: '5px',
                boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <Box sx={{ mt: 2, ml: 3, mb: 2, mr: 3 }}>
                  <FormControl sx={{ display: 'flex', flex: '0 1 calc(50% - 10px)', flexDirection: 'row', width: '100%'}}>
                    <FormControl sx={{ mr: 3, width: '100%'}}>
                      <InputLabel htmlFor="lab-name">Название</InputLabel>
                      <OutlinedInput
                        id="lab-name"
                        label="Название"
                        value={this.state.lab.name}
                        onChange={(event) => this.handleChangeInput(event, 'name')}
                      />
                    </FormControl>
                    <FormControl sx={{ mr: 3, width: '100%' }}>
                      <InputLabel htmlFor="lab-domicId">Domic ID</InputLabel>
                      <OutlinedInput
                        id="lab-domicId"
                        label="Domic ID"
                        type='number'
                        inputProps={{ min: 0 }}
                        value={this.state.lab.domic_lab_id}
                        onChange={(event) => this.handleChangeInput(event, 'domic_lab_id')}
                      />
                    </FormControl>
                    <IconButton onClick={this.handleClickAdd(module)}>
                      <DoneOutlineOutlinedIcon sx={{ fontSize: 'xx-large'}}/>
                    </IconButton>
                  </FormControl>
                  {(this.state.lab.name === "" || this.state.lab.domic_lab_id === "" || this.state.invalidMessage)
                     && <p style={{ color: 'red' }}>{this.state.invalidMessage}</p>}
                </Box>
              </Collapse>
              {labsByModule[module].map(lab => (
                <Box key={module+'_'+lab.id}
                sx={{
                  borderRadius: '5px',
                  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
                  mb: '1px'}}
                  >
                  <Accordion expanded={expanded === `panel${lab.id}`}
                    onChange={this.handleChangeAccordion(`panel${lab.id}`, lab.id)}
                  >
                    <AccordionSummary sx={{  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}
                      expandIcon={<ExpandMoreIcon />}
                      id={'accordion'+lab.id}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                        <Typography>{lab.name}</Typography>
                        <Box>
                          <IconButton onClick={this.handleClickOpenUpdate(lab.id, lab.module, lab.name, lab.domic_lab_id)}>
                            <EditOutlinedIcon sx={{ fontSize: 'xx-large' }} />
                          </IconButton>
                          <IconButton onClick={this.handleClickDelete(lab.id)}>
                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 'xx-large' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl>
                        <Typography sx={{ m: 1 }}>Domic ID: {lab.domic_lab_id}</Typography>
                        <Box sx={{ display: 'flex', flex: '0 1 calc(50% - 10px)', flexDirection: 'row', width: '100%'}}>
                          <Box sx={{ display: 'flex', flex: '0 1 calc(50% - 10px)', flexDirection: 'column', width: '100%'}}>
                            <Button
                              sx={{ backgroundColor: '#5f8ce7', fontWeight: '700',
                                 height: '50%',  mb: 2, mr: 2 }}
                              type='submit'
                              variant='contained'
                              color='primary'
                              onClick={this.handleSubmitLab(lab.id)}
                            >
                              Обновить таблицу
                            </Button>

                            <Button
                                sx={{ backgroundColor: '#5f8ce7', fontWeight: '700',
                                height: '50%',  mb: 2, mr: 2, ":disabled": { backgroundColor: '#eaf1ff' } }}
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={this.state.selectedCriteria.length === 0}
                                onClick={this.handleSubmitCriteria(lab.id)}
                              >
                                Обновить критерии
                              </Button>
                          </Box>

                          <FormControl sx={{display: 'flex', flex: '0 1 calc(50% - 10px)', flexDirection: 'column', width: '100%'}}>
                            <InputLabel id="multiple-select-allcriteria-label">Критерии</InputLabel>
                            <Select
                              labelId="multiple-select-allcriteria-label"
                              id="multiple-select-allcriteria"
                              multiple
                              value={selectedCriteria}
                              onChange={this.handleChangeSelectCriteria}
                              input={<OutlinedInput label="Критерии" />}
                              renderValue={(select) => ''}
                              MenuProps={MenuProps}
                              sx={{ width: '100%', height: 50 }}
                            >
                              <MenuItem key="select-all-criteria" value='select-all-criteria'>
                                <Checkbox
                                  checked={selectAllCriteria}
                                  indeterminate={selectedCriteria.length > 0 && selectedCriteria.length < availableCriteria.length}
                                />
                                <ListItemText primary={'Выбрать все'} />
                              </MenuItem>

                              {availableCriteria.length !== 0 && availableCriteria.map((criterion) => (
                                  <MenuItem key={'item-criteria'+criterion.id} value={criterion.id}>
                                    <Checkbox checked={selectedCriteria.includes(criterion.id)} />
                                    <ListItemText primary={criterion.name} />
                                  </MenuItem>
                                ))}
                              
                            </Select>
                          </FormControl>
                        </Box>
                        
                        {this.state.invalidUpdateInput && <p style={{ color: 'red' }}>{this.state.invalidUpdateInput}</p>}
                        <TableContainer component={Paper} sx={{ overflowY: 'auto', maxHeight: 800}}>
                          <Table aria-label="table">
                            <TableHead sx={{ bgcolor: '#d4e3fc', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}>
                              <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="left">Описание</TableCell>
                                <TableCell align="left">Процент за выполнение</TableCell>
                                <TableCell align="left">Порядок критерия</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody  sx={{ boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)' }}>
                              {criteriaForLab[lab.id] && criteriaForLab[lab.id].map((criterion, i) => (
                                <TableRow
                                  key={`criterion-${i}`}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, 
                                        '&:nth-of-type(even)': { backgroundColor: '#f2f7ff' } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {criterion.name}
                                  </TableCell>
                                  <TableCell align="left">{criterion.description}</TableCell>
                                    <TableCell align="left">
                                      <FormControl>
                                        <Input
                                          id="lab-percent"
                                          label="Процент"
                                          type='number'
                                          value={criterion.procent}
                                          onChange={event => this.handleChangeInputForCriteria(event, 'procent', criterion.id, lab)}
                                        />
                                      </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                      <FormControl>
                                        <Input
                                          id="lab-index"
                                          label="Порядок"
                                          type='number'
                                          value={criterion.index_number}
                                          onChange={event => this.handleChangeInputForCriteria(event, 'index_number', criterion.id, lab)}
                                        />
                                      </FormControl>
                                    </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Collapse in={expandedUpdate === lab.id} timeout="auto" unmountOnExit
                      sx={{ mb: '3px', borderRadius: '5px',
                      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}
                    >
                      <Box sx={{ mt: 2, ml: 3, mb: 2, mr: 3 }}>
                        <FormControl sx={{ display: 'flex', flex: '0 1 calc(33.33% - 10px)', flexDirection: 'row', width: '100%'}}>
                          <FormControl sx={{ mr: 3,  width: '100%'}}>
                            <InputLabel htmlFor="lab-name">Название</InputLabel>
                            <OutlinedInput
                              id="lab-name"
                              label="Название"
                              value={this.state.lab.name}
                              onChange={(event) => this.handleChangeInput(event, 'name')}
                            />
                          </FormControl>
                          <FormControl sx={{ mr: 3, width: '100%' }}>
                            <InputLabel htmlFor="lab-domicId">Domic ID</InputLabel>
                            <OutlinedInput
                              id="lab-domicId"
                              label="Domic ID"
                              type='number'
                              inputProps={{ min: 0 }}
                              value={this.state.lab.domic_lab_id}
                              onChange={(event) => this.handleChangeInput(event, 'domic_lab_id')}
                            />
                          </FormControl>
                          <FormControl sx={{ mr: 3,  width: '100%'}}>
                            <InputLabel id="select-module-label">Модуль</InputLabel>
                            <Select
                              labelId="select-module-label"
                              id="select-module"
                              value={this.state.lab.module}
                              onChange={(event) => this.handleChangeInput(event, 'module')}
                              input={<OutlinedInput label="Модуль" />}
                              renderValue={(select) => select}
                              MenuProps={MenuProps}
                            >
                              {modules.map(module => (
                                <MenuItem key={`form`+module} value={module}>
                                  <ListItemText primary={module} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <IconButton onClick={this.handleClickUpdate(lab.id)}>
                            <DoneOutlineOutlinedIcon sx={{ fontSize: 'xx-large'}}/>
                          </IconButton>
                        </FormControl>
                        {(this.state.lab.name === "" || this.state.lab.module === "" ||
                          this.state.lab.domic_lab_id === "" || this.state.invalidMessage)
                          && <p style={{ color: 'red' }}>{this.state.invalidMessage}</p>}
                      </Box>
                    </Collapse>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

export default FormCreation;