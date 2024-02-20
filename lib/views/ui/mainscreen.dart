import 'package:flutter/material.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:shoes/controllers/mainscreen_provider.dart';
import 'package:shoes/views/shared/bottom_nav.dart';
import 'package:shoes/views/shared/bottom_nav_widget.dart';
import 'package:shoes/views/ui/cartpage.dart';
import 'package:shoes/views/ui/homepage.dart';
import 'package:shoes/views/ui/product_by_cat.dart';
import 'package:shoes/views/ui/profile.dart';
import 'package:shoes/views/ui/searchpage.dart';
import 'package:provider/provider.dart';

class MainScreen extends StatelessWidget {
  MainScreen({super.key});

  List<Widget> pageList = [
    const HomePage(),
    const SearchPage(),
    const HomePage(),
    CartPage(),
    const ProfilePage()
  ];

  @override
  Widget build(BuildContext context) {
    return Consumer<MainScreenNotifier>(
      builder: (context, mainScreenNotifier, child) {
        return Scaffold(
          backgroundColor: const Color(0xFFE2E2E2),
          body: pageList[mainScreenNotifier.pageIndex],
          bottomNavigationBar: const BottoNavBar(),
        );
      },
    );
  }
}
