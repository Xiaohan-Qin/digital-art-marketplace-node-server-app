## Users API

**GET: Get All Users**
```
/api/users
```

**POST: Create New User**
```
/api/users
```

**PUT: Update User**
```
/api/users/:userId
```

**DELETE: Delete User**
```
/api/users/:userId
```

## Collection API

**GET: Get All Collections**
```
/api/collection
```
```
{
    name: string,
    encodedName: string,
    contractAddress: string,
    description: string,
    thumbnailUrl: string
}
```

## Shop API

**GET: Get Shop Page**
```
/api/shop/:contractAddress/:page
```
```
[
    {ProductObject1},
    {ProductObject2},
    ...
    {ProductObject25}
]
```

## Product API

**GET: Get One Product Details**
```
/api/product/:contractAddress/:tokenId
```
```
{
    name: string,
    contractAddress: string,
    tokenId: string,
    chain: string,
    tokenStandard: string,
    description: string,
    image: string
}
```

**GET: Get One Transaction**
```
/api/product/tx/:contractAddress/:tokenId
```
```
{
    assetType: string,
    price: string,
    priceUsd: string,
    transactionDate: string
}
```