import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {Vehicle, FilterOptions} from './types';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Chip,
    AppBar,
    Toolbar, Button,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const GET_VEHICLES = gql`
    query Vehicles($languageCode: String = "ru") {
        vehicles(lang: $languageCode) {
            title
            description
            icons {
                large
                medium
            }
            level
            type {
                name
                title
                icons {
                    default
                }
            }
            nation {
                name
                title
                color
                icons {
                    small
                    medium
                    large
                }
            }
        }
    }
`;

const App: React.FC = () => {
    const {loading, error, data} = useQuery(GET_VEHICLES);
    const [filters, setFilters] = useState<FilterOptions>({
        level: null,
        nation: null,
        type: null,
    });
    const [visibleShips, setVisibleShips] = useState<number>(40);
    const shipsPerLoad = 40;

    const handleFilterChange = (event: SelectChangeEvent<string | number>) => {
        const {name, value} = event.target;
        setFilters({
            ...filters,
            [name]: value === 'all' ? null : value,
        });
    };

    if (loading) return <CircularProgress/>;
    if (error) return <Alert severity="error">Ошибка загрузки данных: {error.message}</Alert>;

    const vehicles: Vehicle[] = data?.vehicles || [];

    console.log(vehicles)

    const levels = Array.from(new Set(vehicles.map((v) => v.level))).sort((a, b) => a - b);
    const nations = Array.from(new Set(vehicles.map((v) => v.nation.name)));
    const types = Array.from(new Set(vehicles.map((v) => v.type.name)));

    const filteredVehicles = vehicles.filter((vehicle) => {
        return (
            (filters.level === null || vehicle.level === filters.level) &&
            (filters.nation === null || vehicle.nation.name === filters.nation) &&
            (filters.type === null || vehicle.type.name === filters.type)
        );
    });

    const titles = filteredVehicles.map(v => v.title);
    const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index);
    console.log('Duplicate titles:', duplicates);

    const displayedShips = filteredVehicles.slice(0, visibleShips);
    const canLoadMore = visibleShips < filteredVehicles.length;

    return (
        <Container maxWidth="xl">
            <AppBar position="static" color="default" sx={{mb: 4}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Мир Кораблей - Каталог
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{mb: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1}}>
                <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
                    <FilterAltIcon sx={{mr: 1}}/> Фильтры
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, sm: 4}} component="div">
                        <FormControl fullWidth>
                            <InputLabel id="level-select-label">Уровень</InputLabel>
                            <Select
                                name="level"
                                value={filters.level ?? 'all'}
                                onChange={handleFilterChange}
                                label="Уровень"
                                labelId="level-select-label"
                            >
                                <MenuItem value="all">Все уровни</MenuItem>
                                {levels.map((level) => (
                                    <MenuItem key={level} value={level}>
                                        {level}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}} component="div">
                        <FormControl fullWidth>
                            <InputLabel id="nation-select-label">Нация</InputLabel>
                            <Select
                                name="nation"
                                value={filters.nation ?? 'all'}
                                onChange={handleFilterChange}
                                label="Нация"
                                labelId="nation-select-label"
                            >
                                <MenuItem value="all">Все нации</MenuItem>
                                {nations.map((nation) => (
                                    <MenuItem key={nation} value={nation}>
                                        {nation}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, sm: 4}} component="div">
                        <FormControl fullWidth>
                            <InputLabel id="type-select-label">Класс</InputLabel>
                            <Select
                                name="type"
                                value={filters.type ?? 'all'}
                                onChange={handleFilterChange}
                                label="Класс"
                                labelId="type-select-label"
                            >
                                <MenuItem value="all">Все классы</MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Найдено кораблей: {filteredVehicles.length}
            </Typography>

            <Grid container spacing={4}>
                {displayedShips.map((vehicle) => (
                    <Grid
                        component="div"
                        key={vehicle.title.trim()
                            ? `${vehicle.title}-${vehicle.nation.name}-${vehicle.level}`
                            : `unnamed-${vehicle.nation.name}-${vehicle.level}-${Math.random().toString(36).slice(2, 11)}`}
                        size={{xs: 12, sm: 4, md: 4, lg: 3}}
                    >
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardMedia
                                component="img"
                                image={vehicle.icons.large}
                                alt={vehicle.title}
                                sx={{objectFit: 'contain', height: 140, pt: 2}}
                            />
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {vehicle.title}
                                </Typography>
                                <Box sx={{display: 'flex', gap: 1, mb: 1}}>
                                    <Chip
                                        label={`Ур. ${vehicle.level}`}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={vehicle.nation.title}
                                        size="small"
                                        sx={{backgroundColor: vehicle.nation.color, color: 'white'}}
                                    />
                                    <Chip label={vehicle.type.title} size="small" variant="outlined"/>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {vehicle.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {canLoadMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 4 }}>
                    <Button
                        variant="contained"
                        onClick={() => setVisibleShips(prev => prev + shipsPerLoad)}
                        sx={{
                            backgroundColor: '#3D5A80',
                            '&:hover': { backgroundColor: '#2C3D55' }
                        }}
                    >
                        Показать ещё {Math.min(shipsPerLoad, filteredVehicles.length - visibleShips)}
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default App;