const LevelData = [
    {
        cam: 0,
        width: 7,
        height: 7,
        layer: [{
            data: [
                [1, 12, 10, 12, 10, 12, 1],
                [10, 0, 0, 0, 0, 0, 10],
                [12, 0, 0, 0, 0, 0, 12],
                [8, 'T', 0, 0, 'B', 'S', 8],
                [12, 0, 0, 0, 0, 0, 12],
                [10, 0, 0, 0, 0, 0, 10],
                [1, 12, 10, 15, 10, 12, 1]
            ]
        },
        {
            data: [
                [0, 3, 14, 3, 14, 3, 0],
                [2, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [9, 0, 0, 0, 0, 0, 9],
                [16, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [0, 11, 13, 1, 13, 11, 0]
            ]
        },
        {
            data: [
                [0, 3, 3, 3, 3, 3, 0],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [0, 11, 11, 11, 11, 11, 0]
            ]
        }],
    },
    {
        cam: 225,
        width: 7,
        height: 7,
        layer: [{
            data: [
                [1, 12, 10, 12, 10, 12, 1],
                [10, 'S', 0, 0, 0, 1, 0],
                [12, 0, 1, 0, 0, 0, 12],
                [10, 0, 'B', 0, 0, 'T', 10],
                [12, 0, 1, 0, 0, 0, 8],
                [10, 0, 0, 0, 0, 1, 0],
                [1, 12, 10, 12, 10, 12, 1]
            ]
        },
        {
            data: [
                [0, 3, 3, 3, 3, 3, 0],
                [11, 0, 0, 0, 0, 1, 11],
                [11, 0, 14, 0, 0, 0, 11],
                [11, 0, 0, 0, 0, 0, 11],
                [11, 0, 14, 0, 0, 0, 9],
                [11, 0, 0, 0, 0, 1, 11],
                [0, 11, 11, 11, 11, 11, 0]
            ]
        }]
    },
    { cam: 135, width: 7, height: 7, layer: [{ data: [[0, 0, 0, 12, 12, 12, 0], [0, 0, 12, 'T', 0, 0, 12], [0, 12, 0, 0, 0, 0, 8], [12, 0, 0, 0, 0, 0, 12], [8, 0, 'B', 0, 10, 12, 0], [12, 'S', 0, 0, 12, 0, 0], [0, 12, 10, 12, 0, 0, 0]] }, { data: [[0, 0, 0, 11, 3, 11, 0], [0, 0, 14, 0, 0, 0, 11], [0, 14, 0, 0, 0, 0, 9], [11, 0, 0, 0, 0, 0, 11], [9, 0, 0, 0, 3, 11, 0], [11, 0, 0, 0, 11, 0, 0], [0, 11, 11, 11, 0, 0, 0]] }, { data: [[0, 0, 0, 11, 16, 11, 0], [0, 0, 14, 0, 0, 0, 11], [0, 14, 0, 0, 0, 0, 17], [11, 0, 0, 0, 0, 0, 11], [17, 0, 0, 0, 16, 11, 0], [11, 0, 0, 0, 11, 0, 0], [0, 11, 11, 11, 0, 0, 0]] }] },
    { cam: 135, width: 7, height: 11, layer: [{ data: [[0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0], [12, 'T', 'T', 0, 12, 12, 12, 15, 12, 0, 0], [12, 'T', 0, 'B', 0, 0, 0, 0, 0, 10, 0], [0, 12, 0, 0, 'B', 0, 0, 10, 0, 8, 0], [0, 0, 12, 12, 'S', 'B', 0, 10, 0, 8, 0], [0, 0, 0, 0, 12, 0, 0, 0, 0, 10, 0], [0, 0, 0, 0, 0, 12, 12, 12, 12, 0, 0]] }, { data: [[0, 3, 3, 11, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 11, 13, 11, 1, 11, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 11, 0, 0, 0, 0, 0, 1, 0, 9, 0], [0, 0, 11, 11, 0, 0, 0, 1, 0, 9, 0], [0, 0, 0, 0, 11, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 11, 14, 14, 14, 14, 11, 0]] }, { data: [[0, 16, 16, 11, 0, 0, 0, 0, 0, 0, 0], [16, 0, 0, 0, 11, 11, 11, 1, 11, 0, 0], [16, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 11, 0, 0, 0, 0, 0, 1, 0, 17, 0], [0, 0, 11, 11, 0, 0, 0, 1, 0, 17, 0], [0, 0, 0, 0, 11, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 11, 14, 14, 14, 14, 11, 0]] }] },
    { cam: 0, width: 9, height: 13, layer: [{ data: [[12, 12, 10, 12, 12, 0, 0, 0, 12, 12, 10, 12, 12], [10, 0, 'T', 0, 10, 12, 12, 12, 10, 0, 'T', 0, 10], [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12], [12, 0, 0, 0, 0, 'B', 0, 0, 0, 0, 0, 0, 12], [12, 12, 0, 0, 0, 0, 0, 'B', 0, 0, 0, 12, 12], [0, 12, 0, 0, 0, 12, 0, 12, 0, 0, 0, 12, 0], [0, 12, 12, 12, 12, 12, 'S', 12, 12, 12, 12, 12, 0], [0, 0, 0, 0, 0, 12, 8, 12, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[11, 11, 14, 11, 11, 0, 0, 0, 11, 11, 14, 11, 11], [11, 0, 0, 0, 11, 3, 11, 3, 11, 0, 0, 0, 11], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11], [13, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11], [0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0], [0, 11, 11, 11, 11, 11, 0, 11, 11, 11, 11, 11, 0], [0, 0, 0, 0, 0, 11, 9, 11, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] },
    { cam: 0, width: 7, height: 13, layer: [{ data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 10, 12, 0], [0, 12, 12, 0, 0, 0, 12, 15, 12, 'S', 0, 0, 10], [12, 0, 0, 10, 8, 10, 0, 0, 0, 0, 'T', 'T', 8], [10, 0, 0, 0, 0, 0, 'B', 'B', 'B', 0, 'B', 0, 10], [12, 0, 0, 0, 0, 0, 0, 'T', 0, 12, 10, 12, 0], [0, 12, 12, 10, 12, 12, 12, 'T', 0, 8, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 3, 11, 0], [0, 11, 11, 0, 0, 0, 11, 1, 11, 0, 0, 0, 11], [11, 0, 0, 11, 9, 11, 0, 0, 0, 0, 0, 0, 9], [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11], [11, 0, 0, 0, 0, 0, 0, 0, 0, 11, 3, 3, 0], [0, 11, 11, 3, 11, 11, 11, 0, 0, 9, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 17, 11, 0], [0, 11, 11, 0, 0, 0, 11, 1, 11, 0, 0, 0, 11], [11, 0, 0, 11, 17, 11, 0, 0, 0, 0, 0, 0, 17], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11], [13, 0, 0, 0, 0, 0, 0, 0, 0, 11, 16, 16, 0], [0, 11, 11, 17, 11, 11, 11, 5, 5, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] },
    { cam: 0, width: 9, height: 15, layer: [{ data: [[0, 0, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 12, 'T', 12, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 12, 'T', 12, 0, 0, 0, 12, 17, 2, 17, 2, 12], [12, 12, 10, 12, 'T', 12, 8, 10, 15, 12, 0, 0, 0, 0, 10], [12, 0, 0, 'T', 0, 0, 0, 0, 0, 4, 0, 0, 'B', 0, 8], [10, 0, 4, 'B', 0, 0, 0, 0, 0, 'B', 0, 0, 0, 0, 10], [12, 0, 0, 0, 0, 'S', 0, 'B', 0, 0, 0, 12, 10, 12, 12], [12, 12, 10, 12, 12, 10, 12, 0, 0, 0, 0, 8, 0, 0, 0], [0, 0, 0, 0, 0, 0, 12, 12, 12, 10, 10, 12, 0, 0, 0]] }, { data: [[0, 0, 0, 11, 17, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 17, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 17, 0, 17, 0, 0, 0, 11, 14, 2, 14, 2, 11], [11, 11, 11, 11, 0, 11, 9, 11, 1, 11, 0, 0, 0, 0, 11], [11, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 9], [13, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 11, 11, 11], [11, 16, 3, 16, 3, 16, 11, 0, 0, 0, 0, 9, 0, 0, 0], [0, 0, 0, 0, 0, 0, 11, 16, 3, 16, 3, 11, 0, 0, 0]] }] },
    { cam: 0, width: 11, height: 13, layer: [{ data: [[12, 12, 10, 10, 12, 12, 0, 0, 0, 0, 0, 0, 0], [12, 0, 'T', 'T', 0, 10, 0, 0, 0, 0, 0, 0, 0], [10, 0, 'T', 'T', 0, 10, 0, 0, 0, 12, 12, 12, 0], [10, 0, 0, 0, 0, 12, 8, 12, 12, 12, 0, 10, 0], [12, 0, 0, 0, 0, 0, 0, 0, 'S', 12, 0, 8, 0], [12, 12, 0, 0, 0, 'B', 0, 'B', 0, 'B', 0, 10, 0], [0, 12, 0, 0, 0, 0, 12, 0, 12, 0, 0, 12, 0], [0, 12, 12, 12, 12, 10, 12, 0, 12, 'B', 0, 12, 0], [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 12, 0], [0, 0, 0, 0, 0, 0, 12, 12, 10, 12, 12, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[11, 14, 14, 14, 14, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 3, 0, 0, 0, 11, 11, 11, 0], [14, 0, 0, 0, 0, 11, 9, 3, 11, 11, 0, 11, 0], [14, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 9, 0], [11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0], [0, 11, 0, 0, 0, 0, 11, 0, 11, 0, 0, 1, 0], [0, 11, 11, 1, 1, 11, 11, 0, 11, 0, 0, 11, 0], [0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 11, 11, 0], [0, 0, 0, 0, 0, 0, 11, 11, 1, 11, 11, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[11, 14, 14, 14, 14, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 11, 0, 0, 0, 0, 5, 0, 0], [14, 0, 0, 0, 0, 5, 5, 5, 5, 0, 5, 0, 0], [11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0], [0, 0, 5, 5, 5, 5, 0, 5, 0, 5, 5, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[11, 14, 14, 14, 14, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0], [11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] },
    { cam: 0, width: 9, height: 11, layer: [{ data: [[0, 0, 12, 12, 12, 12, 12, 12, 12, 0, 0], [12, 10, 12, 0, 0, 0, 0, 0, 12, 10, 12], [10, 'T', 0, 0, 4, 'S', 4, 0, 0, 0, 10], [12, 0, 'T', 0, 0, 4, 0, 0, 0, 0, 12], [10, 'T', 0, 0, 0, 0, 0, 0, 0, 0, 10], [12, 12, 0, 0, 0, 'B', 0, 0, 0, 12, 12], [0, 10, 0, 0, 'B', 0, 'B', 0, 0, 10, 0], [0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0], [0, 12, 12, 15, 12, 8, 12, 12, 12, 12, 0]] }, { data: [[0, 0, 11, 14, 11, 14, 11, 14, 11, 0, 0], [11, 14, 11, 0, 0, 0, 0, 0, 11, 14, 11], [3, 0, 0, 0, 14, 0, 14, 0, 0, 0, 2], [3, 0, 0, 0, 0, 14, 0, 0, 0, 0, 3], [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16], [11, 11, 0, 0, 0, 0, 0, 0, 0, 11, 11], [0, 13, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 0], [0, 11, 11, 1, 11, 9, 11, 1, 11, 11, 0]] }, { data: [[0, 0, 11, 14, 17, 14, 17, 14, 11, 0, 0], [11, 14, 11, 0, 0, 0, 0, 0, 11, 14, 11], [2, 0, 0, 0, 14, 0, 14, 0, 0, 0, 2], [11, 0, 0, 0, 0, 14, 0, 0, 0, 0, 11], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11], [11, 11, 4, 5, 4, 5, 4, 5, 4, 11, 11], [0, 11, 4, 4, 4, 4, 4, 4, 4, 11, 0], [0, 11, 4, 5, 4, 5, 4, 5, 4, 11, 0], [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0]] }] },
    { cam: 0, width: 9, height: 11, layer: [{ data: [[0, 0, 0, 12, 15, 12, 12, 12, 12, 0, 0], [0, 12, 12, 0, 0, 0, 0, 0, 0, 12, 0], [10, 'T', 0, 0, 0, 'B', 0, 0, 0, 'T', 10], [0, 12, 0, 0, 'B', 'S', 'B', 0, 0, 12, 0], [10, 'T', 0, 0, 0, 'B', 0, 0, 0, 'T', 10], [0, 12, 0, 0, 0, 0, 0, 0, 12, 12, 0], [0, 12, 0, 0, 0, 0, 0, 16, 0, 0, 0], [0, 0, 10, 12, 0, 12, 10, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 11, 1, 11, 11, 1, 11, 0, 0], [0, 11, 11, 0, 0, 0, 0, 0, 0, 11, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 17, 0, 0, 0, 0, 0, 0, 0, 17, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 11, 0, 0, 0, 0, 0, 0, 11, 11, 0], [0, 11, 0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 0, 13, 11, 0, 11, 11, 0, 0, 0, 0], [0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 11, 11, 11, 11, 11, 11, 11, 0], [0, 11, 11, 0, 0, 0, 0, 0, 0, 14, 0], [0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0], [0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0], [0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0], [0, 14, 0, 0, 0, 0, 0, 0, 11, 11, 0], [0, 14, 0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] },
    { width: 11, height: 13, cam: 90, layer: [{ data: [[0, 12, 10, 12, 0, 12, 10, 15, 10, 12, 10, 12, 0], [12, 0, 0, 'T', 4, 'T', 0, 0, 0, 0, 0, 0, 12], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10], [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 12], [10, 'T', 4, 0, 0, 'B', 0, 'B', 0, 0, 0, 'T', 10], [12, 4, 0, 0, 0, 0, 'B', 0, 0, 0, 0, 4, 12], [10, 'T', 0, 0, 0, 'B', 0, 'B', 0, 0, 0, 0, 10], [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12], [0, 12, 10, 10, 12, 0, 'S', 0, 12, 10, 10, 12, 0], [0, 0, 0, 0, 0, 8, 10, 8, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[11, 1, 1, 11, 0, 11, 3, 1, 17, 1, 16, 11, 11], [14, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 14], [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 11], [2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [11, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 11], [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], [11, 11, 3, 16, 11, 0, 0, 0, 11, 3, 16, 11, 11], [0, 0, 0, 0, 0, 9, 13, 9, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] },
    { width: 11, height: 13, cam: 0, layer: [{ data: [[0, 12, 12, 12, 8, 12, 12, 0, 0, 0, 0, 0, 0], [12, 0, 0, 0, 0, 0, 0, 12, 10, 12, 10, 12, 12], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12], [12, 0, 'T', 0, 0, 0, 0, 12, 'B', 'B', 'B', 0, 12], [12, 'T', 12, 'T', 0, 0, 0, 10, 0, 0, 0, 0, 12], [12, 12, 0, 12, 0, 0, 'S', 12, 12, 10, 12, 0, 12], [12, 'T', 12, 'T', 0, 0, 0, 10, 0, 0, 0, 0, 12], [12, 0, 'T', 0, 0, 0, 0, 12, 'B', 'B', 'B', 0, 12], [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12], [12, 0, 0, 0, 0, 0, 0, 12, 10, 12, 10, 12, 12], [0, 12, 12, 15, 8, 12, 12, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 1, 11, 1, 9, 13, 11, 0, 0, 0, 0, 0, 0], [11, 0, 0, 0, 0, 0, 0, 11, 14, 14, 14, 14, 11], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], [11, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 14], [11, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 14], [11, 4, 0, 4, 0, 0, 0, 16, 16, 16, 11, 0, 14], [11, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 14], [11, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 14], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14], [11, 0, 0, 0, 0, 0, 0, 11, 14, 14, 14, 14, 11], [0, 1, 11, 1, 9, 11, 11, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 1, 11, 1, 17, 16, 11, 0, 0, 0, 0, 0, 0], [11, 0, 0, 0, 0, 0, 0, 11, 4, 4, 4, 4, 0], [2, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 0, 4, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 4, 0, 4, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 0, 4, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [2, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 4], [11, 0, 0, 0, 0, 0, 0, 11, 4, 4, 4, 4, 0], [0, 1, 11, 1, 17, 16, 11, 0, 0, 0, 0, 0, 0]] }] },
    { width: 17, height: 17, cam: 0, layer: [{ data: [[0, 0, 0, 0, 0, 0, 0, 10, 8, 10, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0], [0, 0, 0, 12, 10, 12, 12, 0, 'B', 0, 12, 12, 10, 12, 0, 0, 0], [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0], [0, 0, 10, 0, 12, 12, 12, 12, 0, 12, 12, 12, 12, 0, 10, 0, 0], [0, 0, 12, 0, 12, 'T', 0, 0, 0, 0, 0, 'T', 12, 0, 12, 0, 0], [0, 12, 12, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 12, 12, 0], [10, 0, 0, 0, 12, 0, 0, 0, 4, 0, 0, 0, 12, 0, 0, 0, 10], [8, 'T', 'B', 0, 0, 0, 0, 'S', 0, 0, 0, 0, 0, 0, 'B', 0, 8], [10, 0, 0, 0, 12, 0, 4, 0, 0, 0, 4, 0, 12, 0, 0, 0, 10], [0, 12, 12, 0, 12, 0, 0, 0, 'B', 0, 0, 0, 12, 0, 12, 12, 0], [0, 0, 12, 0, 12, 'T', 0, 0, 0, 0, 0, 'T', 12, 0, 12, 0, 0], [0, 0, 10, 0, 12, 12, 12, 12, 0, 12, 12, 12, 12, 0, 10, 0, 0], [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0], [0, 0, 0, 12, 10, 12, 12, 0, 'B', 0, 12, 12, 10, 12, 0, 0, 0], [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 10, 8, 10, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 0, 0, 0, 0, 11, 9, 11, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 11, 11, 11, 11, 0, 0, 0, 11, 11, 11, 11, 0, 0, 0], [0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0], [0, 0, 11, 0, 11, 11, 3, 11, 0, 11, 3, 11, 11, 0, 11, 0, 0], [0, 0, 11, 0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 0, 11, 0, 0], [0, 2, 11, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 11, 2, 0], [11, 0, 0, 0, 11, 0, 0, 0, 16, 0, 0, 0, 11, 0, 0, 0, 11], [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9], [11, 0, 0, 0, 11, 0, 16, 0, 0, 0, 16, 0, 11, 0, 0, 0, 11], [0, 2, 11, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 11, 2, 0], [0, 0, 11, 0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 0, 11, 0, 0], [0, 0, 11, 0, 11, 11, 3, 11, 0, 11, 3, 11, 11, 0, 11, 0, 0], [0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0], [0, 0, 0, 11, 11, 11, 11, 0, 0, 0, 11, 11, 11, 11, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 11, 9, 11, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0], [0, 0, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0], [0, 0, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0], [0, 0, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0], [0, 5, 5, 5, 4, 0, 0, 0, 16, 0, 0, 0, 4, 5, 5, 5, 0], [0, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 0], [0, 5, 5, 5, 4, 0, 16, 0, 0, 0, 16, 0, 4, 5, 5, 5, 0], [0, 0, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0], [0, 0, 0, 5, 4, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0], [0, 0, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0], [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }, { data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 11, 14, 14, 14, 14, 14, 14, 14, 11, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 16, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 16, 0, 0, 0, 16, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0], [0, 0, 0, 0, 11, 14, 14, 14, 14, 14, 14, 14, 11, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }] }
];