import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";

// Order data structure
const orders = [
  {
    id: "ORD-1001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      tier: "Gold",
    },
    products: [
      { name: "Premium Wireless Headphones", quantity: 1, price: "$149.99" },
      { name: "Wireless Charging Pad", quantity: 2, price: "$29.99" },
    ],
    orderDate: "2023-05-15",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    deliveryStatus: "Shipped",
    paymentMethod: "Credit Card",
    totalAmount: "$209.97",
  },
  {
    id: "ORD-1002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      tier: "Silver",
    },
    products: [
      { name: 'Ultra HD Smart TV 55"', quantity: 1, price: "$799.99" },
    ],
    orderDate: "2023-05-16",
    deliveryAddress: "456 Oak Ave, Los Angeles, CA 90001",
    deliveryStatus: "Delivered",
    paymentMethod: "PayPal",
    totalAmount: "$799.99",
  },
  {
    id: "ORD-1003",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      tier: "Bronze",
    },
    products: [
      { name: "Bluetooth Portable Speaker", quantity: 3, price: "$59.99" },
      { name: "4K Action Camera", quantity: 1, price: "$249.99" },
    ],
    orderDate: "2023-05-17",
    deliveryAddress: "789 Pine Rd, Chicago, IL 60601",
    deliveryStatus: "Processing",
    paymentMethod: "Credit Card",
    totalAmount: "$429.96",
  },
  {
    id: "ORD-1004",
    customer: {
      name: "Emily Wilson",
      email: "emily@example.com",
      tier: "Gold",
    },
    products: [
      { name: "Smartphone Pro Max 2023", quantity: 1, price: "$999.99" },
      { name: "Ergonomic Office Chair", quantity: 1, price: "$199.99" },
    ],
    orderDate: "2023-05-18",
    deliveryAddress: "321 Elm Blvd, Houston, TX 77001",
    deliveryStatus: "Pending",
    paymentMethod: "Bank Transfer",
    totalAmount: "$1199.98",
  },
  {
    id: "ORD-1005",
    customer: {
      name: "Michael Brown",
      email: "michael@example.com",
      tier: "Platinum",
    },
    products: [
      { name: "Premium Wireless Headphones", quantity: 2, price: "$149.99" },
      { name: "Wireless Charging Pad", quantity: 1, price: "$29.99" },
      { name: "4K Action Camera", quantity: 1, price: "$249.99" },
    ],
    orderDate: "2023-05-19",
    deliveryAddress: "654 Maple Dr, Phoenix, AZ 85001",
    deliveryStatus: "Shipped",
    paymentMethod: "Credit Card",
    totalAmount: "$579.96",
  },
];

function OrderTable() {
  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => {
    const amount = parseFloat(order.totalAmount.replace("$", ""));
    return sum + amount;
  }, 0);

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>Recent customer orders</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead className="min-w-[150px]">Customer</TableHead>
            <TableHead className="min-w-[200px] hidden md:table-cell">Products</TableHead>
            <TableHead className="w-[120px] hidden sm:table-cell">Order Date</TableHead>
            <TableHead className="min-w-[200px] hidden lg:table-cell">Delivery Address</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[120px] hidden md:table-cell">Payment</TableHead>
            <TableHead className="w-[100px] text-right">Amount</TableHead>
            <TableHead className="w-[150px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-gray-500 hidden sm:block">
                  {order.customer.email}
                </div>
                <Badge variant="outline" className="mt-1 hidden sm:inline-flex">
                  {order.customer.tier}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="space-y-1">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="text-sm">
                      {product.quantity} × {product.name}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{order.orderDate}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="text-sm line-clamp-2">
                  {order.deliveryAddress}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.deliveryStatus === "Delivered"
                      ? "default"
                      : order.deliveryStatus === "Shipped"
                      ? "secondary"
                      : order.deliveryStatus === "Processing"
                      ? "outline"
                      : "destructive"
                  }
                  className="whitespace-nowrap"
                >
                  {order.deliveryStatus}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{order.paymentMethod}</Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                {order.totalAmount}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="font-medium">Customer Information</h3>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p>{order.customer.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p>{order.customer.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Tier</p>
                                <Badge>{order.customer.tier}</Badge>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Order Summary</h3>
                            <div className="overflow-x-auto">
                              <Table className="mt-2 min-w-full">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">
                                      Quantity
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Price
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Subtotal
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.products.map((product, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>{product.name}</TableCell>
                                      <TableCell className="text-right">
                                        {product.quantity}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {product.price}
                                      </TableCell>
                                      <TableCell className="text-right"></TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">
                                      {order.totalAmount}
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Shipping Information</h3>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Delivery Address
                                </p>
                                <p>{order.deliveryAddress}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge
                                  variant={
                                    order.deliveryStatus === "Delivered"
                                      ? "default"
                                      : order.deliveryStatus === "Shipped"
                                      ? "secondary"
                                      : order.deliveryStatus === "Processing"
                                      ? "outline"
                                      : "destructive"
                                  }
                                >
                                  {order.deliveryStatus}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Payment Method
                                </p>
                                <Badge variant="outline">
                                  {order.paymentMethod}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" className="hidden sm:inline-flex">
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="sm:hidden">
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="font-medium">Customer Information</h3>
                            <div className="mt-2 grid grid-cols-1 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p>{order.customer.name}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p>{order.customer.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Tier</p>
                                <Badge>{order.customer.tier}</Badge>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Order Summary</h3>
                            <div className="overflow-x-auto">
                              <Table className="mt-2 min-w-full">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">
                                      Qty
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Price
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.products.map((product, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>{product.name}</TableCell>
                                      <TableCell className="text-right">
                                        {product.quantity}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {product.price}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell className="text-right">
                                      {order.totalAmount}
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Shipping Information</h3>
                            <div className="mt-2 grid grid-cols-1 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Delivery Address
                                </p>
                                <p>{order.deliveryAddress}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge
                                  variant={
                                    order.deliveryStatus === "Delivered"
                                      ? "default"
                                      : order.deliveryStatus === "Shipped"
                                      ? "secondary"
                                      : order.deliveryStatus === "Processing"
                                      ? "outline"
                                      : "destructive"
                                  }
                                >
                                  {order.deliveryStatus}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Payment Method
                                </p>
                                <Badge variant="outline">
                                  {order.paymentMethod}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={5} className="hidden sm:table-cell">Total Revenue</TableCell>
            <TableCell colSpan={3} className="sm:hidden">Total</TableCell>
            <TableCell className="text-right font-medium">
              {totalRevenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell className="text-right">{orders.length} orders</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const SellerOrders = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar className="w-full md:w-64" />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Customer Orders</h1>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              Export
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none">
              Filter
            </Button>
          </div>
        </div>
        <OrderTable />
      </div>
    </div>
  );
};

export default SellerOrders;