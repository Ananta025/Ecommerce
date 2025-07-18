import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInvoice = async (order, type = 'a4', companyInfo = {}) => {
  // Prepare data for template
  const data = {
    companyName: companyInfo.name || 'Your Company Name',
    companyAddress: companyInfo.address || 'Company Address',
    companyPhone: companyInfo.phone || 'Company Phone',
    companyGSTIN: companyInfo.gstin || 'GSTIN',
    billNo: order._id,
    date: new Date(order.createdAt).toLocaleString(),
    paymentMode: order.paymentMode || 'N/A',
    customerName: order.customerName,
    customerAddress: order.address,
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price.toFixed(2),
      subtotal: (item.price * item.quantity).toFixed(2)
    })),
    discount: order.discount ? order.discount.toFixed(2) : undefined,
    cgst: order.cgst ? order.cgst.toFixed(2) : undefined,
    sgst: order.sgst ? order.sgst.toFixed(2) : undefined,
    total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      + (order.cgst || 0) + (order.sgst || 0) - (order.discount || 0),
    amountPaid: order.amountPaid ? order.amountPaid.toFixed(2) : undefined,
    cashTendered: order.cashTendered ? order.cashTendered.toFixed(2) : undefined
  };

  // Select template
  const templateFile = type === 'thermal' ? 'invoice-thermal.html' : 'invoice-a4.html';
  const templatePath = path.join(__dirname, templateFile);
  const templateHtml = await fs.readFile(templatePath, 'utf8');
  const template = Handlebars.compile(templateHtml);
  const html = template(data);

  // Puppeteer PDF options
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  let pdfOptions;
  if (type === 'thermal') {
    pdfOptions = { width: '80mm', margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true };
  } else {
    pdfOptions = { format: 'A4', margin: { top: '0', right: '0', bottom: '0', left: '0' }, printBackground: true };
  }
  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();
  return pdfBuffer;
};

export default generateInvoice;
