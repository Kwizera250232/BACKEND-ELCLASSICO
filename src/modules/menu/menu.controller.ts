import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMenuItemDto } from './dto.create-menu-item';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('categories')
  categories() {
    return this.menuService.listCategories();
  }

  @Get('items')
  items() {
    return this.menuService.listItems();
  }

  @Post('items')
  createItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.createItem(dto);
  }
}
